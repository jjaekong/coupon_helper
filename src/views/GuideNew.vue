<template>
    <b-container class="py-4">
        <b-card no-body :style="'width: calc('+ width +'px + 1.25rem * 2 + 2px)'" class="mx-auto">
            <b-form @submit.prevent="addBrand">
                <b-card-header>
                    <b-card-title class="mb-0">이용안내 등록</b-card-title>
                </b-card-header>
                <b-card-body :style="'width: calc('+ width +'px + 1.25rem * 2)'">
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
                    <b-form-group>
                        <b-form-row>
                            <b-col class="d-flex align-items-center">
                                <b-form-radio-group v-model="width">
                                    <b-form-radio :value="684" accesskey="w">684</b-form-radio>
                                    <b-form-radio :value="758" accesskey="w">758</b-form-radio>
                                    <b-form-radio :value="770" accesskey="w">770</b-form-radio>
                                    <b-form-radio :value="860" accesskey="w">860</b-form-radio>
                                </b-form-radio-group>
                            </b-col>
                            <b-col>
                                <b-form-input type="number" required placeholder="넓이 직접 입력" v-model="width" />
                            </b-col>
                        </b-form-row>
                    </b-form-group>
                    <b-form-group>
                        <b-form-file placeholder="상단 이미지 선택" @input="selectTopBanner" accept="image/*" />
                        <b-card-img :src="topBanner" v-if="topBanner" class="rounded-0 mt-3" />
                        <b-row v-if="topBanner">
                            <b-col class="text-right">
                                <b-btn size="sm" variant="link" class="px-0" @click="deleteTopBanner">상단 이미지 삭제</b-btn>
                            </b-col>
                        </b-row>
                    </b-form-group>
                    <b-form-group>
                        <b-form-file placeholder="중단 이미지 선택" @input="selectMidBanner" accept="image/*" />
                        <b-card-img :src="midBanner" v-if="midBanner" class="rounded-0 mt-3" />
                        <b-row v-if="midBanner">
                            <b-col class="text-right">
                                <b-btn size="sm" variant="link" class="px-0" @click="deleteMidBanner">중단 이미지 삭제</b-btn>
                            </b-col>
                        </b-row>
                    </b-form-group>
                    <b-form-group v-for="(guide, key) in guides" :key="key">
                        <b-form-input class="mb-2" type="text" placeholder="문구 제목. 예) 이용 안내" v-model="guide.title" required />
                        <b-form-textarea class="overflow-hidden" row="5" max-rows="100" placeholder="문구 내용" v-model="guide.text" required wrap="hard" />
                    </b-form-group>
                </b-card-body>
                <b-card-footer>
                    <b-form-row>
                        <b-col class="text-left">
                            <b-btn class="mr-2" @click="removeGuide()" variant="secondary">문구 삭제</b-btn>
                            <b-btn class="mr-2" @click="addGuide()" variant="primary">문구 추가</b-btn>
                        </b-col>
                        <b-col class="text-right">
                            <b-btn class="ml-2" variant="secondary" @click="gotoList">목록으로</b-btn>
                            <b-btn class="ml-2" type="submit" variant="primary">등록</b-btn>
                        </b-col>
                    </b-form-row>
                </b-card-footer>
            </b-form>
        </b-card>
    </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    name: 'guide-new',
    data: function() {
        return {
            topBanner: null,
            midBanner: null,
            title: null,
            width: 860,
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
        gotoList: function() {
            this.$router.go(-1)
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
        addBrand: function() {
            
            const db = firebase.firestore()

            db.collection('brands').add({
                topBanner: this.topBanner,
                midBanner: this.midBanner,
                width: this.width,
                title: this.title,
                writer: this.writer,
                guides: this.guides,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                deletedAt: null,
            }).then((doc) => {
                db.collection('brands').doc(doc.id).collection('histories').add({
                    topBanner: this.topBanner,
                    midBanner: this.midBanner,
                    width: this.width,
                    title: this.title,
                    writer: this.writer,   
                    guides: this.guides,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    this.$router.push('/')    
                }).catch((error) => {
                    console.log(error)
                })
                
            }).catch((error) => {
                console.log(error)
            })
        },
        selectTopBanner: function(file) {
            // 파일이 선택되었는지
            if (!file) {
                return false;
            }
            // 선택한 파일이 이미지인지
            if (file.type.indexOf("image") < 0) {
                alert('이미지를 선택하세요.');
                return false;
            }
            // 선택한 이미지 읽어와서 화면에 출력하기
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.addEventListener("load", () => {
                const image = new Image()
                image.src = reader.result
                image.onload = () => {
                    this.topBanner = reader.result || null;
                }
                image.remove()

            }, false)

        },
        deleteTopBanner: function() {
            this.topBanner = null
        },
        selectMidBanner: function(file) {
            // 파일이 선택되었는지
            if (!file) {
                return false;
            }
            // 선택한 파일이 이미지인지
            if (file.type.indexOf("image") < 0) {
                alert('이미지를 선택하세요.');
                return false;
            }
            // 선택한 이미지 읽어와서 화면에 출력하기
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.addEventListener("load", () => {
                const image = new Image()
                image.src = reader.result
                image.onload = () => {
                    this.midBanner = reader.result || null;
                }
                image.remove()

            }, false)

        },
        deleteMidBanner: function() {
            this.midBanner = null
        }
    }
}
</script>