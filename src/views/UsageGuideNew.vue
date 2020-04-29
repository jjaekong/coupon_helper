<template>
    <b-container class="py-4">
        <b-row>
            <b-col cols="8" class="text-left mx-auto">
                <h4 class="mb-3">이용안내 등록</h4>
                <b-form @submit.prevent="addUsage">
                    <b-form-row>
                        <b-col>
                            <b-form-group>
                                <b-form-input type="text" required placeholder="브랜드명" v-model="title" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                                <b-form-input type="text" required  placeholder="등록자명" v-model="writer" />
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                    <b-form-group v-for="(guide, key) in guides" :key="key">
                        <b-form-input class="mb-2" type="text" placeholder="제목" v-model="guide.title" required />
                        <b-form-textarea class="overflow-hidden" row="5" max-rows="100" placeholder="내용" v-model="guide.text" required wrap="hard" />
                    </b-form-group>
                    <b-form-row class="pt-3 border-top">
                        <b-col>
                            <b-btn class="mr-2" @click="removeGuide()" variant="danger">삭제</b-btn>
                            <b-btn class="mr-2" @click="addGuide()" variant="primary">추가</b-btn>
                        </b-col>
                        <b-col class="text-right">
                            <b-btn type="submit" variant="primary">등록</b-btn>
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
    data: function() {
        return {
            title: null,
            writer: null,
            guides: [
                {
                    title: null,
                    text: null
                }
            ]
        }
    },
    methods: {
        addGuide: function() {
            this.guides.push({
                title: null,
                text: null
            })
        },
        removeGuide: function() {
            this.guides.pop();
        },
        addUsage: function() {
            
            const db = firebase.firestore()

            db.collection('brands').add({
                title: this.title,
                writer: this.writer,
                guides: this.guides,
                createAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((doc) => {
                db.collection('brands').doc(doc.id).collection('histories').add({
                    title: this.title,
                    writer: this.writer,   
                    guides: this.guides,
                    createAt: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    this.$router.push('/')    
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