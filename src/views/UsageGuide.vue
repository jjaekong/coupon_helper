<template>
    <div class="usage-guide">

        <div class="steps border-bottom text-left">
            <b-container>
                <b-row no-gutters>
                    <b-col>
                        <b-card class="border-left border-right rounded-0" style="border: 0; height: 8rem;">
                            <template v-slot:header>
                                <h6>넓이 <small class="text-muted">(alt + w, 화살표로 넓이 선택)</small></h6>
                            </template>
                            <b-form-group>
                                <b-form-radio-group v-model="width" size="sm">
                                    <b-form-radio :value="684" accesskey="w">684</b-form-radio>
                                    <b-form-radio :value="758" accesskey="w">758</b-form-radio>
                                    <b-form-radio :value="770" accesskey="w">770</b-form-radio>
                                    <b-form-radio :value="860" accesskey="w">860</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card class="border-right rounded-0" style="border: 0; height: 8rem;" header-class="d-flex align-items-center">
                            <template v-slot:header>
                                <h6>문구 <small class="text-muted">(alt + q)</small></h6>
                                <b-btn size="sm" variant="link" class="ml-auto border-0 p-0 text-dark" to="/usage_guide/new"><b>새로 추가</b></b-btn>
                                <b-btn size="sm" variant="link" class="ml-3 border-0 p-0 text-dark" to="/usage_guide/list"><b>목록</b></b-btn>
                            </template>
                            <b-form-group>
                                <b-form-input list="brand-list" size="sm" accesskey="q" placeholder="브랜드명의 일부를 입력하고 선택하세요." v-model="brand" />
                                <b-form-datalist id="brand-list" :options="brandOptions" />
                                    <!-- <option v-for="(brand, key) in brands" :key="key" :value="brand.id">{{brand.title}}</option>
                                </b-form-datalist> -->
                            </b-form-group>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card class="border-right rounded-0" style="border: 0; height: 8rem;">
                            <template v-slot:header>
                                <h6>상단 이미지 <small class="text-muted">(alt + t)</small></h6>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-file size="sm" accept="image/*" accesskey="t" :disabled="width <= 0 || selectedBrand == null" @input="selectBanner" />
                            </b-form-group>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <b-container class="my-4 position-relative" v-if="width > 0 && selectedBrand != null">

            <b-dropdown class="controls position-absolute" style="top: 0; right: 15px;" no-caret size="sm" toggle-class="p-2" menu-class="shadow" variant="info" right>
                <template v-slot:button-content>
                    <b-icon icon="list" />
                </template>
                <b-dd-item style="font-size: .9rem;" @click="addTextarea()">전체 내용 저장</b-dd-item>
                <b-dd-item style="font-size: .9rem;" @click="saveAllGuideToImage()">전체 이미지 저장</b-dd-item>
                <b-dd-divider />
                <b-dd-item style="font-size: .9rem;" @click="addGuide()">문구 영역 추가</b-dd-item>
            </b-dropdown>

            <b-card no-body class="mx-auto border-secondary" :style="'width: calc('+ width +'px + 2px + 1.25rem * 2); padding: 1.25rem'">

                <div class="preview">
                    <b-card-img :src="banner" v-if="banner" class="rounded-0" style="margin-bottom: 30px;" />
                    <b-card-body class="guide py-0 position-relative" :style="'width: calc('+ width +'px); margin-bottom: 30px; padding-left: 20px; padding-right: 20px; border: 1px dashed #ccc;'" v-for="(guide, key) in selectedBrand.guides" :key="key">
                        <b-form-group class="mb-0">
                            <b-form-input type="text" class="border-0 px-0 rounded-0" style="border-bottom: 2px solid #2a2a2a !important; line-height: 45px; font-size: 22px; color: #2a2a2a; font-weight: 700;" v-model="guide.title" />
                        </b-form-group>
                        <b-form-group>
                            <b-form-textarea row="1" max-rows="100" class="border-0 px-0 rounded-0 overflow-hidden" spellcheck="false" style="padding-top: 20px; padding-bottom: 20px; font-size: 16px; line-height: 26px; color: #605f5f; white-space: pre-wrap;" v-model="guide.text" wrap="hard"></b-form-textarea>
                        </b-form-group>
                        <b-dropdown class="position-absolute" style="right:0; bottom: 0;" no-caret toggle-class="p-1 border-0" menu-class="shadow" size="sm" variant="link" right>
                            <template v-slot:button-content>
                                <b-icon icon="gear" variant="secondary" />
                            </template>
                            <b-dd-item style="font-size: .8rem;">HTML 소스보기</b-dd-item>
                            <b-dd-item style="font-size: .8rem;" @click="saveGuideToImage(key)">이미지로 저장</b-dd-item>
                            <b-dd-divider />
                            <b-dd-item style="font-size: .8rem;" @click="removeGuide(key)">이 영역 삭제</b-dd-item>
                        </b-dropdown>
                    </b-card-body>
                    <b-card-body class="contact">
                        <b-row>
                            <b-col class="text-left">
                                <p class="mb-0">발행자: ㈜옴니텔</p>
                                <p class="mb-0">고객센터: 1588-5639</p>
                                <p class="mb-0">운영시간: 09:30 ~ 18:00 / 토, 일, 공휴일 휴무</p>
                            </b-col>
                            <b-col class="text-right">
                                <b-img :src="require('@/assets/logo.gif')" />
                            </b-col>
                        </b-row>
                    </b-card-body>
                </div>

            </b-card>
            
        </b-container>

    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    components: {
    },
    data: function() {
        return {
            banner: null,
            width: 860,
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
        addGuide: function() {
            this.selectedBrand.guides.push({
                title: '제목',
                text: '내용'
            })
        },
        removeGuide: function(key) {
            console.log('removeGuide', key)
            // this.guides.splice(key, 1)
            this.selectedBrand.guides.splice(key, 1)
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
                    // console.log('load image ==> ', image, image.width)
                    // if (this.width == self.selectedChannelWidth) {
                    //     self.selectedTitleFileName = $event.target.files[0].name
                    // } else {
                    //     // alert('이미지의 넓이가 '+self.selectedChannelWidth+'px 이 아닙니다.')
                    //     self.needConfirmTitlebar = true
                    // }
                    this.banner = reader.result || null;
                }
                image.remove()

            }, false)

        },
        saveGuideToImage: function(key) {

            const guide = document.querySelectorAll('.guide')[key]

            guide.style.border = '0px'
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

                        guide.style.border = '1px dashed #ccc'
                        guide.querySelector('.dropdown').style.display = 'block'

                    }, false)
                }, "image/jpeg", 1)
            });

        },
        saveAllGuideToImage: function() {

            const preview = document.querySelector('.preview')
            
            preview.querySelectorAll('.guide').forEach(section => {
                section.style.border = '0px'
                section.querySelector('.dropdown').style.display = 'none'
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

                        preview.querySelectorAll('.guide').forEach(section => {
                            section.style.border = '1px dashed #ccc'
                            section.querySelector('.dropdown').style.display = 'block'
                        })

                        document.body.classList.remove('overflow-hidden')

                    }, false)
                }, "image/jpeg", 1)
            });

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
