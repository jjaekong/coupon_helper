<template>
    <b-container class="py-4">
        <b-row>
            <b-col cols="8" class="text-left mx-auto">
                <h4 class="mb-3">{{title}} 수정</h4>
                <b-form @submit.prevent="editUsage">
                    <b-form-row>
                        <b-col>
                            <b-form-group>
                                <b-form-input type="text" required placeholder="브랜드명" v-model="title" disabled />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                                <b-form-input type="text" required  placeholder="수정자명" v-model="editor" />
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                    <b-form-group v-for="(guide, key) in guides" :key="key">
                        <b-form-input class="mb-2" type="text" placeholder="문구 제목. 예) 이용 안내" v-model="guide.title" required />
                        <b-form-textarea class="overflow-hidden" row="5" max-rows="100" placeholder="문구 내용" v-model="guide.text" required wrap="hard" />
                    </b-form-group>
                    <b-form-row class="pt-3 border-top">
                        <b-col>
                            <b-btn class="mr-2" @click="removeGuide()" variant="secondary">문구 삭제</b-btn>
                            <b-btn class="mr-2" @click="addGuide()" variant="primary">문구 추가</b-btn>
                        </b-col>
                        <b-col class="text-right">
                            <b-btn class="ml-2" variant="secondary" @click="gotoList">목록으로</b-btn>
                            <b-btn class="ml-2" variant="secondary" @click="deleteGuides">삭제</b-btn>
                            <b-btn class="ml-2" type="submit" variant="primary">수정</b-btn>
                        </b-col>
                    </b-form-row>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    name: 'guide-edit',
    data: function() {
        return {
            title: null,
            editor: null,
            guides: [
                {
                    title: null,
                    text: null
                }
            ]
        }
    },
    created: function() {
        this.getGuides()
    },
    methods: {
        gotoList: function() {
            this.$router.go(-1)
        },
        deleteGuides: function() {
            console.log('deleteGuides')
        },
        getGuides: function() {
            firebase.firestore().collection('brands').doc(this.$route.params.id)
                .get()
                .then((docSnap) => {
                    if (docSnap.exists) {
                        let data = docSnap.data()
                        this.title = data.title
                        this.guides = data.guides
                    }
                })
        },
        addGuide: function() {
            this.guides.push({
                title: null,
                text: null
            })
        },
        removeGuide: function() {
            this.guides.pop();
        },
        editUsage: function() {
            
            const db = firebase.firestore()

            db.collection('brands').doc(this.$route.params.id)
                .set({
                    title: this.title,
                    editor: this.editor,
                    guides: this.guides,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true }).then(() => {
                    db.collection('brands').doc(this.$route.params.id).collection('histories').add({
                        title: this.title,
                        editor: this.editor,
                        guides: this.guides,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    this.$router.push('/guide/list')
                }).catch((error) => {
                    console.log(error)
                })
                
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>