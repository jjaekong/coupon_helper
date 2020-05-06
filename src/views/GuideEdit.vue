<template>
    <b-container class="py-4">
        <b-card no-body :style="'width: calc('+ width +'px + 1.25rem * 2 + 2px)'" class="mx-auto">
            <b-card-header>
                <b-card-title class="mb-0">{{title}} 수정</b-card-title>
            </b-card-header>
            <b-form @submit.prevent="editUsage">
                <b-card-body>
                    <b-form-row>
                        <b-col>
                            <b-form-group>
                                <b-form-input type="text" required placeholder="브랜드명" v-model="title" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                                <b-form-input type="text" required  placeholder="수정자명" v-model="editor" />
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
                        <b-form-file placeholder="상단 이미지 선택" @input="selectBanner" accept="image/*" />
                        <b-card-img :src="banner" v-if="banner" class="rounded-0 mt-3" />
                        <b-row v-if="banner">
                            <b-col class="text-right">
                                <b-btn size="sm" variant="link" class="px-0" @click="deleteBanner">상단 이미지 삭제</b-btn>
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
                            <b-btn class="ml-2" variant="secondary" @click="deleteGuides">삭제</b-btn>
                            <b-btn class="ml-2" type="submit" variant="primary">수정</b-btn>
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
    name: 'guide-edit',
    data: function() {
        return {
            banner: null,
            width: 860,
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
        getGuides: function() {
            firebase.firestore().collection('brands').doc(this.$route.params.id)
                .get()
                .then((docSnap) => {
                    if (docSnap.exists) {
                        let data = docSnap.data()
                        this.title = data.title
                        this.banner = data.banner
                        this.width = data.width
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
                    banner: this.banner,
                    width: this.width,
                    title: this.title,
                    editor: this.editor,
                    guides: this.guides,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true }).then(() => {
                    db.collection('brands').doc(this.$route.params.id).collection('histories').add({
                        banner: this.banner,
                        width: this.width,
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
        },
        selectBanner: function(file) {
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
                    this.banner = reader.result || null;
                }
                image.remove()

            }, false)

        },
        deleteBanner: function() {
            this.banner = null
        },
        deleteGuides: function() {
            if (confirm('정말 삭제하시겠습니까?')) {
                firebase.firestore().collection('brands').doc(this.$route.params.id)
                    .set({
                        deletedAt: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true })
                    .then(() => {
                        alert('삭제하였습니다.')
                        this.$router.push('/')
                    })
                    .catch((error) => {
                        alert(`오류 발생: ${error.message} (${error.code})`)
                    })
            }
        }
    }
}
</script>