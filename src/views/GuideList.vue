<template>
    <b-container>
        <b-row class="pt-3 pb-2 align-items-center">
            <b-col class="text-left">
                <b-input-group class="w-50">
                    <b-form-input v-model="filter" type="search" placeholder="필터(alt + s)" accesskey="s" />
                </b-input-group>
            </b-col>
            <b-col class="text-right">
                <b-btn to="/guide/new" variant="primary">새로 등록</b-btn>
            </b-col>
        </b-row>
        <b-table striped hover :caption-top="true" :fields="fields" :items="items" :filter="filter" v-if="this.items.length > 0">
            <template v-slot:cell(title)="data">
                <b-link :to="'/guide/'+data.item.id">{{data.value}}</b-link>
            </template>
            <template v-slot:cell(createdAt)="data">
                {{getFormattedDate(data.value)}}
            </template>
            <template v-slot:cell(updatedAt)="data">
                {{getFormattedDate(data.value)}}
            </template>
        </b-table>
        <b-card class="mt-4" v-else>
            <p>등록된 이용안내 문구가 없습니다.</p>
            <b-link to="/guide/new">문구 등록하기</b-link>
        </b-card>
    </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

export default {
    name: 'guide-list',
    data: function() {
        return {
            filter: null,
            items: [],
            fields: [
                { key: 'title', sortable: true },
                { key: 'guides', sortable: false },
                { key: 'writer', sortable: true },
                { key: 'createdAt', sortable: true },
                { key: 'editor', sortable: true },
                { key: 'updatedAt', sortable: true },
            ],
        }
    },
    created: function() {
        this.getList();
    },
    methods: {
        getList: function() {
            this.items = []
            firebase.firestore().collection('brands')
                .where('deletedAt', '==', null)
                .orderBy('title', 'asc')
                .get()
                .then((querySnap) => {
                    querySnap.forEach(doc => {
                        let data = doc.data()
                        let guides = data.guides.map(guide => {
                            return guide.title
                        })
                        this.items.push({
                            title: data.title,
                            guides: guides.toString(),
                            writer: data.writer,
                            createdAt: data.createdAt.seconds,
                            editor: data.editor || null,
                            updatedAt: data.updatedAt ?  data.updatedAt.seconds : null,
                            id: doc.id
                        })
                    })
                })
        },
        getFormattedDate: function(d) {
            return d ? moment(d*1000).format('LL') : null;
        }
    }
}
</script>