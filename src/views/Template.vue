<template>
    <div>
        <div class="steps border-bottom text-left">
            <b-container>
                <b-row no-gutters>
                    <b-col class="border-left border-right">
                        <b-card class="border-0" style="height: 11.5rem;">
                            <template v-slot:header>
                                <div class="d-flex" style="height: 1.5rem;">
                                    <h6 class="mb-0">이미지 선택</h6>
                                </div>
                            </template>
                            <b-row class="row no-gutters align-items-center mb-3">
                                <b-col cols="1">배경</b-col>
                                <b-col>
                                    <div v-if="isBgDirectly"><b-form-file accept="image/*" accesskey="b" placeholder="배경 이미지 선택 (Alt + b)" @input="selectBgImage" /></div>
                                    <div v-else><b-form-input type="search" list="bg-list" accesskey="b" placeholder="배경 이미지 선택 (Alt + b)" v-model="bgName" /></div>
                                    <b-datalist id="bg-list">
                                        <option :value="bg.name" v-for="(bg, key) in bgList" :key="key" />
                                    </b-datalist>
                                </b-col>
                                <b-col cols="2" class="text-right">
                                    <b-form-checkbox size="sm" v-model="isBgDirectly" accesskey="D">직접 입력</b-form-checkbox>
                                </b-col>
                            </b-row>
                            <b-row class="row no-gutters align-items-center">
                                <b-col cols="1">상품</b-col>
                                <b-col>
                                    <b-form-file accept="image/*" accesskey="i" placeholder="상품 이미지 선택 (Alt + i)" @input="selectProdImage" />
                                </b-col>
                                <!-- <b-col cols="2"></b-col> -->
                            </b-row>
                                
                        </b-card>
                    </b-col>
                    <b-col class="border-right">
                        <b-card class="border-0" style="height: 11.5rem;">
                            <template v-slot:header>
                                <div style="height: 1.5rem;">
                                    <h6 class="mb-0">상품명 입력<small class="text-muted">(Alt + t)</small></h6>
                                </div>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-textarea placeholder="상품명" v-model="prodTitle" accesskey="t" rows="3" />
                            </b-form-group>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <b-container class="py-4 my-4">
            <b-row>
                <b-col>
                    <b-card no-body>
                        <b-card-header>
                                단축키
                        </b-card-header>
                        <b-list-group flush class="text-left">
                            <b-list-group-item class="p-2"><small>(+): 이미지 확대(0.1씩)</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>Alt+(+): 이미지 확대(0.01씩)</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>(-): 이미지 축소(0.1씩)</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>Alt+(-): 이미지 축소(0.01씩)</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>(방향키): 이미지 이동(1px씩)</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>Shift+(방향키): 이미지 이동(10px씩)</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>숫자 0: 이미지 가운데로 이동</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>Alt+(g): 가이드라인 보이기/숨기기</small></b-list-group-item>
                            <b-list-group-item class="p-2"><small>Alt+(s): 이미지 저장</small></b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-col>
                <b-col cols="7">
                    <div class="preview-wrapper d-flex align-items-center justify-content-center border" style="width: calc(640px + 2px); min-height: calc(640px + 2px);">
                        <div class="preview position-relative overflow-hidden">
                            <img :src="bgImage" v-if="bgImage" class="bg-image" />
                            <img :src="prodImage" v-if="prodImage" class="prod-image position-absolute" style="top: 0; right: 0;" />
                            <div class="bg-white position-absolute" style="top: 50%; left: 0;" v-if="prodTitle">{{prodTitle}}</div>
                        </div>
                    </div>
                </b-col>
                <b-col>
                    <b-card class="mb-3">
                        <template v-slot:header>
                            확대/축소
                        </template>
                        <b-form-group>
                            <b-form-input type="number" id="scale" accesskey="c" min="0.1" max="10" step=".1" />
                        </b-form-group>
                        <b-row no-gutters class="justify-content-between">
                            <b-col cols="auto"><b-btn @click="scaleTo(-0.1)" size="sm" class="p-1">-0.1</b-btn></b-col>
                            <b-col cols="auto"><b-btn @click="scaleTo(-0.01)" size="sm" class="p-1">-0.01</b-btn></b-col>
                            <b-col cols="auto"><b-btn @click="scaleTo(0.01)" size="sm" class="p-1">+0.01</b-btn></b-col>
                            <b-col cols="auto"><b-btn @click="scaleTo(0.1)" size="sm" class="p-1">+0.1</b-btn></b-col>
                        </b-row>
                    </b-card>
                    <b-card class="mb-3">
                        <template v-slot:header>
                            위치
                        </template>
                        <b-row no-gutters class="py-1">
                            <b-col class="text-center"><b-btn @click="moveToTop(-10)" size="sm">10</b-btn></b-col>
                        </b-row>
                        <b-row no-gutters class="py-1">
                            <b-col class="text-center"><b-btn @click="moveToTop(-1)" size="sm">1</b-btn></b-col>
                        </b-row>
                        <b-row no-gutters class="py-1">
                            <b-col><b-btn @click="moveToLeft(-10)" size="sm">10</b-btn></b-col>
                            <b-col><b-btn @click="moveToLeft(-1)" size="sm">1</b-btn></b-col>
                            <b-col><b-btn @click="resetPos()" size="sm">0</b-btn></b-col>
                            <b-col><b-btn @click="moveToLeft(1)" size="sm">1</b-btn></b-col>
                            <b-col><b-btn @click="moveToLeft(10)" size="sm">10</b-btn></b-col>
                        </b-row>
                        <b-row no-gutters class="py-1">
                            <b-col class="text-center"><b-btn @click="moveToTop(1)" size="sm">1</b-btn></b-col>
                        </b-row>
                        <b-row no-gutters class="py-1">
                            <b-col class="text-center"><b-btn @click="moveToTop(10)" size="sm">10</b-btn></b-col>
                        </b-row>
                    </b-card>
                    <b-form-group>
                        <b-form-checkbox switch v-model="visibleGuideline" accesskey="g">가이드라인 <small class="text-muted">(alt + g)</small></b-form-checkbox>
                    </b-form-group>
                    <b-btn class="mt-3" block variant="primary" @click="saveThumbnails" accesskey="s">이미지 저장 <small>(Alt + s)</small></b-btn>
                </b-col>
            </b-row>
        </b-container>
        
        <!-- <div class="text-wrap text-break">{{bgImage}}</div> -->

    </div>
</template>

<script>
import { DATA_URL_TEMP_SEVEN, DATA_URL_TEMP_YESCOUPON, DATA_URL_TEMP_INUMBER } from '@/templates'

export default {
    data: function() {
        return {
            isBgDirectly: false,
            prodImage: null,
            prodTitle: null,
            bgList: [
                { name: '세븐일레븐', dataURL: DATA_URL_TEMP_SEVEN },
                { name: '예스쿠폰', dataURL: DATA_URL_TEMP_YESCOUPON },
                { name: '쿠프아이넘버', dataURL: DATA_URL_TEMP_INUMBER },
            ],
            bgName: null,
            bgFile: null,
            bgImage: null,
            visibleGuideline: true
        }
    },
    computed: {
    },
    watch: {
        bgName: function(value) {
            this.bgImage = value ? this.bgList.find(bg => bg.name == value).dataURL : null
            this.prodImage = null
            this.prodTitle = null
        },
        isBgDirectly: function(value) {
            if (value) {
                this.bgName = null
            } else {
                this.bgImage = null
            }
        }
    },
    methods: {
        moveToLeft: function() {
        },
        moveToTop: function() {
        },
        resetPos: function() {
        },
        scaleTo: function() {
        },
        saveThumbnails: function() {
            
        },
        selectBgImage: function(file) {

            this.bgImage = null
            
            if (!file) {
                return false
            }
            if (file.type.indexOf("image") < 0) {
                alert('이미지를 선택하세요.')
                return false
            }

            const reader = new FileReader()
            reader.onload = () => {
                this.bgImage = reader.result
            }
            reader.readAsDataURL(file)

        },
        selectProdImage: function(file) {

            this.prodImage = null

            if (!file) {
                return false
            }
            if (file.type.indexOf("image") < 0) {
                alert('이미지를 선택하세요.')
                return false
            }

            this.prodTitle = file.name

            const reader = new FileReader()
            reader.onload = () => {
                this.prodImage = reader.result
            }
            reader.readAsDataURL(file)

        }
    }
}
</script>

<style lang="scss" scoped>

</style>