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
                                <b-btn size="sm" variant="link" class="ml-auto border-0 p-0 text-dark"><b>새로 추가</b></b-btn>
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

        <b-container class="my-5" v-if="width > 0 && selectedBrand != null">
            <b-card no-body class="preview mx-auto border-secondary" :style="'width: calc('+ width +'px + 2px + 1.25rem * 2); padding: 1.25rem'">

                <!-- <b-card-body class="py-0" :style="'width: calc('+ width +'px); margin-bottom: 30px; padding-left: 20px; padding-right: 20px; border: 1px dashed #ccc;'">
                    <b-form-group class="mb-0">
                        <b-form-input type="text" class="border-0 px-0 rounded-0" style="border-bottom: 2px solid #2a2a2a !important; line-height: 45px; font-size: 22px; color: #2a2a2a; font-weight: 700;" />
                    </b-form-group>
                    <b-form-group>
                        <b-form-textarea row="1" max-rows="100" class="border-0 px-0 rounded-0 overflow-hidden" spellcheck="false" style="padding-top: 20px; padding-bottom: 20px; font-size: 16px; line-height: 26px; color: #605f5f;" />
                    </b-form-group>
                </b-card-body>
                <b-card-body class="py-0" :style="'width: calc('+ width +'px); margin-bottom: 30px; padding-left: 20px; padding-right: 20px; border: 1px dashed #ccc;'">
                    <b-form-group class="mb-0">
                        <b-form-input type="text" class="border-0 px-0 rounded-0" style="border-bottom: 2px solid #2a2a2a !important; line-height: 45px; font-size: 22px; color: #2a2a2a; font-weight: 700;" />
                    </b-form-group>
                    <b-form-group>
                        <b-form-textarea row="1" max-rows="100" class="border-0 px-0 rounded-0 overflow-hidden" spellcheck="false" style="padding-top: 20px; padding-bottom: 20px; font-size: 16px; line-height: 26px; color: #605f5f;" />
                    </b-form-group>
                </b-card-body> -->
                <b-card-img :src="banner" v-if="banner" class="rounded-0" style="margin-bottom: 30px;" />
                <b-card-body class="py-0 position-relative" :style="'width: calc('+ width +'px); margin-bottom: 30px; padding-left: 20px; padding-right: 20px; border: 1px dashed #ccc;'" v-for="(guide, key) in selectedBrand.guides" :key="key">
                    <b-form-group class="mb-0">
                        <b-form-input type="text" class="border-0 px-0 rounded-0" style="border-bottom: 2px solid #2a2a2a !important; line-height: 45px; font-size: 22px; color: #2a2a2a; font-weight: 700;" :value="guide.title" />
                    </b-form-group>
                    <b-form-group>
                        <b-form-textarea row="1" max-rows="100" class="border-0 px-0 rounded-0 overflow-hidden" spellcheck="false" style="padding-top: 20px; padding-bottom: 20px; font-size: 16px; line-height: 26px; color: #605f5f;" :value="guide.text" />
                    </b-form-group>
                    <b-dropdown class="position-absolute" style="right:0; bottom: 0;" no-caret toggle-class="p-2 border-0" size="sm" variant="link" dropright>
                        <template v-slot:button-content>
                            <b-icon icon="gear" />
                        </template>
                        <b-dd-item style="font-size: .8rem;">HTML 소스보기</b-dd-item>
                        <b-dd-item style="font-size: .8rem;">이미지로 저장</b-dd-item>
                        <b-dd-item style="font-size: .8rem;">내용 새로 저장</b-dd-item>
                    </b-dropdown>
                </b-card-body>

            </b-card>
            <b-row no-gutters class="btn-area mt-5 pt-3 border-top">
                <b-col class="text-left">
                    <b-btn size="sm" @click="addTextarea()">영역 추가</b-btn>
                </b-col>
                <b-col class="text-right">
                    <b-btn size="sm" class="ml-1">전체 내용 새로 저장</b-btn>
                    <b-btn size="sm" class="ml-1">전체 이미지 저장</b-btn>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>

export default {
    components: {
    },
    data: function() {
        return {
            banner: null,
            width: 0,
            brand: null,
            brands: [
                {
                    id: '1FDArekjwjklfdsFDSA',
                    title: "GS25 수퍼마켓 금액권",
                    guides: [
                        {
                            title: '상품 이용안내',
                            text: 'TEST1'
                        },
                        {
                            title: '상품 이용안내',
                            text: 'TEST1'
                        }
                    ]
                },
                {
                    id: '2jfisd90afjdsaj32',
                    title: "GS25 수퍼마켓 교환권",
                    guides: [
                        {
                            title: '상품 이용안내',
                            text: 'TEST2'
                        },
                        {
                            title: '상품 이용안내',
                            text: 'TEST2'
                        }
                    ]
                },
                {
                    id: '30j32fFKofj320F',
                    title: "역전우동 금액권",
                    guides: [
                        {
                            title: '상품 이용안내',
                            text: 'TEST3'
                        },
                        {
                            title: '상품 이용안내',
                            text: 'TEST3'
                        },
                    ]
                },
                {
                    id: '4FDSAJjfkjewofFDSAJK',
                    title: "역전우동 교환권",
                    guides: [
                        {
                            title: '상품 이용안내',
                            text: 'TEST4'
                        },
                        {
                            title: '상품 이용안내',
                            text: 'TEST4'
                        }
                    ]
                }
            ],
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
    methods: {
        addTextarea: function() {
            this.selectedBrand.guides.push({
                title: '제목',
                text: '내용'
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
</style>
