<template>
    <div>

        <div class="steps border-bottom text-left">
            <b-container>
                <b-row no-gutters>
                    <b-col class="border-left border-right">
                        <b-card class="border-0" style="height: 8rem;" header-class="d-flex align-items-center">
                            <template v-slot:header>
                                <h6 class="mb-0">문구/브랜드 <small class="text-muted">(alt + q)</small></h6>
                                <b-btn size="sm" variant="link" class="ml-auto border-0 p-0 text-dark" to="/guide/new" style="font-size: .8rem;"><b>새로 추가</b></b-btn>
                                <b-btn size="sm" variant="link" class="ml-3 border-0 p-0 text-dark" to="/guide/list" style="font-size: .8rem;"><b>목록</b></b-btn>
                            </template>
                            <b-form-group>
                                <b-form-input list="brand-list" accesskey="b" placeholder="브랜드명의 일부를 입력하고 선택하세요." v-model="brand" />
                                <b-form-datalist id="brand-list" :options="brandOptions" />
                            </b-form-group>
                        </b-card>
                    </b-col>
                    <b-col class="border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">넓이 <small class="text-muted">(alt + w, 화살표로 넓이 선택)</small></h6>
                            </template>
                            <b-row no-gutters v-if="selectedBrand">
                                <b-col cols="8" class="d-flex align-items-center">
                                    <b-form-group class="mb-0">
                                        <b-form-radio-group v-model="selectedBrand.width" size="sm">
                                            <b-form-radio :value="684" accesskey="w">684</b-form-radio>
                                            <b-form-radio :value="758" accesskey="w">758</b-form-radio>
                                            <b-form-radio :value="770" accesskey="w">770</b-form-radio>
                                            <b-form-radio :value="860" accesskey="w">860</b-form-radio>
                                        </b-form-radio-group>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group class="mb-0">
                                        <b-form-input type="number" min="0" max="1028" v-model="selectedBrand.width" style="width: 100%;" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-card-text class="text-muted" v-else>먼저 문구/브랜드를 선택하세요.</b-card-text>
                        </b-card>
                    </b-col>
                    <b-col class="border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">상단 이미지 <small class="text-muted">(alt + t)</small></h6>
                            </template>
                            <b-form-group class="mb-0" v-if="selectedBrand">
                                <b-form-file accept="image/*" accesskey="t" @input="selectTopBanner" placeholder="상단 이미지 선택" />
                            </b-form-group>
                            <b-card-text class="text-muted" v-else>먼저 문구/브랜드를 선택하세요.</b-card-text>
                        </b-card>
                    </b-col>
                    <b-col class="border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">중단 이미지 <small class="text-muted">(alt + m)</small></h6>
                            </template>
                            <b-form-group class="mb-0" v-if="selectedBrand">
                                <b-form-file accept="image/*" accesskey="m" @input="selectMidBanner" placeholder="중단 이미지 선택" />
                            </b-form-group>
                            <b-card-text class="text-muted" v-else>먼저 문구/브랜드를 선택하세요.</b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <b-container class="my-4" v-if="selectedBrand != null">

            <b-card no-body class="mx-auto rounded-0" :style="'width: calc('+ selectedBrand.width +'px + 2px);'">

                <div class="preview text-left">
                    <b-card-body v-if="selectedBrand.topBanner" class="banner p-0 position-relative" :style="'width: calc('+ selectedBrand.width +'px);'">
                        <b-card-img :src="selectedBrand.topBanner" class="rounded-0" />
                        <b-dropdown class="position-absolute" style="right:0; bottom: 0;" no-caret toggle-class="p-2 border-0" menu-class="shadow" size="sm" variant="link" right>
                            <template v-slot:button-content>
                                <b-icon icon="gear" variant="secondary" />
                            </template>
                            <b-dd-item style="font-size: .8rem;" @click="deleteTopBanner">상단 이미지 삭제</b-dd-item>
                        </b-dropdown>
                    </b-card-body>
                    <b-card-body v-if="selectedBrand.midBanner" class="banner p-0 position-relative" :style="'width: calc('+ selectedBrand.width +'px);'">
                        <b-card-img :src="selectedBrand.midBanner" class="rounded-0" />
                        <b-dropdown class="position-absolute" style="right:0; bottom: 0;" no-caret toggle-class="p-2 border-0" menu-class="shadow" size="sm" variant="link" right>
                            <template v-slot:button-content>
                                <b-icon icon="gear" variant="secondary" />
                            </template>
                            <b-dd-item style="font-size: .8rem;" @click="deleteMidBanner">중단 이미지 삭제</b-dd-item>
                        </b-dropdown>
                    </b-card-body>
                    <b-card-body class="guide py-0 position-relative" :style="'width: calc('+ selectedBrand.width +'px); margin-top: 30px; padding-left: 20px; padding-right: 20px;'" v-for="(guide, key) in selectedBrand.guides" :key="key">
                        <!-- <b-form-group class="mb-0">
                            <b-form-input type="text" class="border-0 px-0 rounded-0" style="border-bottom: 2px solid #2a2a2a !important; line-height: 45px; font-size: 22px; color: #2a2a2a; font-weight: 700;" v-model="guide.title" />
                        </b-form-group> -->
                        <!-- <b-form-group>
                            <b-form-textarea row="1" max-rows="100" class="border-0 px-0 rounded-0 overflow-hidden" spellcheck="false"  v-model="guide.text" wrap="hard"></b-form-textarea>
                        </b-form-group> -->
                        <h4 class="mb-0" style="border-bottom: 2px solid #2a2a2a !important; line-height: 45px; font-size: 22px; color: #2a2a2a; font-weight: 700;">{{guide.title}}</h4>
                        <div style="padding-top: 20px; padding-bottom: 20px; font-size: 16px; line-height: 26px; color: #605f5f; white-space: pre-wrap;" v-text="guide.text"></div>
                        <b-dropdown class="position-absolute" style="right: 1.5rem; top: .75rem;" no-caret toggle-class="p-1 border-0" menu-class="shadow" size="sm" variant="link" right>
                            <template v-slot:button-content>
                                <b-icon icon="gear" variant="secondary" />
                            </template>
                            <b-dd-item style="font-size: .8rem;" @click="showGuideHtml(key)">HTML 소스보기</b-dd-item>
                            <b-dd-item style="font-size: .8rem;" @click="saveGuideToImage(key)">이미지로 저장</b-dd-item>
                        </b-dropdown>
                    </b-card-body>
                    <b-card-body class="contact" style="margin-top: 30px">
                        <b-row>
                            <b-col class="text-left">
                                <p class="mb-0">발행자: ㈜티사이언티픽</p>
                                <p class="mb-0">고객센터: 1588-5639</p>
                                <p class="mb-0">운영시간: 09:30 ~ 18:00 / 토, 일, 공휴일 휴무</p>
                            </b-col>
                            <b-col class="text-right">
                                <b-img :src="require('@/assets/logo_tsc.jpg')" />
                            </b-col>
                        </b-row>
                    </b-card-body>
                </div>

            </b-card>

            <b-row class="mt-4 mb-5">
                <b-col>
                    <b-btn class="mx-1" @click="showBrandHtml()">전체 HTML 소스보기</b-btn>
                    <b-btn class="mx-1" @click="saveBrandToImage()">전체 이미지 저장</b-btn>
                </b-col>
            </b-row>
            
        </b-container>

    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    name: 'guide',
    data: function() {
        return {
            brand: null,
            brands: [],
        }
    },
    computed: {
        brandOptions: function() {
            return this.brands.map(b => b.title);
        },
        selectedBrand: function() {
            return this.brands.find(b => b.title == this.brand) || null
        }
    },
    created: function() {
        this.getGuides();
    },
    methods: {
        getGuides: function() {
            const db = firebase.firestore()
            db.collection('brands')
                .where('deletedAt', '==', null)
                .orderBy('title', 'asc')
                .get()
                .then((querySanp) => {
                    querySanp.docs.forEach(doc => {
                        let data = doc.data()
                        this.brands.push({
                            ...data,
                            id: doc.id
                        })
                    })
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
                    this.selectedBrand.topBanner = reader.result || null;
                }
                image.remove()

            }, false)

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
                    this.selectedBrand.midBanner = reader.result || null;
                }
                image.remove()

            }, false)

        },
        saveGuideToImage: function(key) {

            const guide = document.querySelectorAll('.guide')[key]

            // guide.style.border = '0px'
            guide.querySelector('.dropdown').style.display = 'none'

            document.documentElement.scrollTop = 0

            this.selectedBrand.guides[key].text.replace(/\n/g, '<br>\n');
            
            html2canvas(guide).then((canvas) => {
                canvas.toBlob((blob) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(blob)
                    reader.addEventListener("load", () => {

                        let url = URL.createObjectURL(blob);
                        let a = document.createElement("a")
                        a.setAttribute("style", "display: none")
                        a.setAttribute("href", url)
                        a.setAttribute("target", "_blank")
                        a.setAttribute("download", this.brand +'_'+ this.selectedBrand.guides[key].title +'.jpg')
                        document.body.appendChild(a)
                        a.click()
                        URL.revokeObjectURL(url);
                        a.remove()

                        // guide.style.border = '1px dashed #ccc'
                        guide.querySelector('.dropdown').style.display = 'block'

                    }, false)
                }, "image/jpeg", 1)
            });

        },
        saveBrandToImage: function() {

            const preview = document.querySelector('.preview')
            
            // preview.querySelectorAll('.guide').forEach(section => {
            //     section.style.border = '0px'
            // })

            preview.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.style.display = 'none'
            })

            document.documentElement.scrollTop = 0
            document.body.classList.add('overflow-hidden')

            html2canvas(preview).then((canvas) => {
                // console.log(canvas)
                // canvas.toDataURL("image/jpeg")
                canvas.toBlob((blob) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(blob)
                    reader.addEventListener("load", () => {

                        let url = URL.createObjectURL(blob);
                        let a = document.createElement("a")
                        a.setAttribute("style", "display: none")
                        a.setAttribute("href", url)
                        a.setAttribute("target", "_blank")
                        a.setAttribute("download", this.brand +'.jpg')
                        document.body.appendChild(a)
                        a.click()
                        URL.revokeObjectURL(url);
                        a.remove()

                        preview.querySelectorAll('.dropdown').forEach(dropdown => {
                            dropdown.style.display = 'block'
                        })

                        // preview.querySelectorAll('.guide').forEach(section => {
                        //     section.style.border = '1px dashed #ccc'
                        // })

                        document.body.classList.remove('overflow-hidden')

                    }, false)
                }, "image/jpeg", 1)
            });

        },
        deleteTopBanner: function() {
            this.selectedBrand.topBanner = null
        },
        deleteMidBanner: function() {
            this.selectedBrand.midBanner = null
        },
        showBrandHtml: function() {
            console.log('showBrandHtml')
        },
        showGuideHtml: function(key) {
            console.log('showGuideHtml', key)
        }
    }
}
</script>

<style lang="scss" scoped>
.preview {
    .form-control {
        box-shadow: none;
    }
}
.controls {
    position: sticky;
}
</style>
