<template>
    <div>
        <div class="steps border-bottom text-left">
            <b-form ref="tempForm">
                <b-container>
                    <b-row no-gutters>
                        <b-col class="border-left border-right">
                            <b-card class="border-0" style="height: 9.5rem;">
                                <template v-slot:header>
                                    <h6 class="mb-0">상품명 입력<small class="text-muted">(Alt + t)</small></h6>
                                </template>
                                <b-form-group class="mb-0">
                                    <b-form-textarea placeholder="상품명" v-model="prodTitle" accesskey="t" rows="2" />
                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
            </b-form>
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
                            <b-list-group-item class="p-2"><small>Alt+(s): 이미지 저장</small></b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-col>
                <b-col cols="7">
                    <div class="preview-wrapper d-flex align-items-center justify-content-center border"
                        style="width: calc(640px + 2px); min-height: calc(640px + 2px);"
                        @drop="dropTempImg"
                        @dragover="dragoverTempImg">
                        <div class="preview overflow-hidden position-relative text-left"  ref="preview" v-if="tempImage"
                            @drop="dropProdImg"
                            @dragover="dragoverProdImg">
                            <template v-if="tempImageType == 232">
                                <img :src="tempImage" />
                                <div class="position-absolute" style="width: 104px; left: 0px; background-color: white" :style="{ 'height': hasPartnerLogo ? '98px' : '121px', 'top': hasPartnerLogo ? '26px' : '3px' }"></div><!-- 커버 -->
                                <div class="position-absolute" style="width: 120px; height: 40px; left: 104px; top: 26px; background-color: white"></div><!-- 커버 -->
                                <div v-if="prodImage" class="prod-image position-absolute overflow-hidden" :style="{ 'width': this.prodImageSize.width+'px', 'height': this.prodImageSize.height+'px', 'left': this.prodImagePos.left+'px', 'top': this.prodImagePos.top+'px'}">
                                    <b-img :src="prodImage" class="position-absolute w-100 h-100" :style="{ 'left': '0px', 'top': '0px', 'transform': `scale(${this.prodImageScale})` }" ref="prod-image" />
                                </div>
                                <div v-if="prodTitle"
                                    class="position-absolute text-break"
                                    style="width: 120px; height: 40px; left: 104px; top: 26px; font-size: 12px; line-height: 18px; color: #000; font-family: 'Gulim', san-serif; text-align: right">
                                    {{prodTitle}}
                                </div>
                                <div v-if="promText"
                                    class="position-absolute prod-text"
                                    style="width: 100%; height: auto; left: 0; top: 0; color: #000; font-size: 12px; line-height: 18px; color: #000; font-family: 'Gulim', san-serif;">
                                    <span>{{promText}}</span>
                                </div>
                            </template>
                            <template v-else-if="tempImageType == 370">
                                <img :src="tempImage" />
                                <div class="position-absolute" style="width: 260px; height: 205px; left: 55px; top: 70px; background-color: white"></div><!-- 커버 -->
                                <div v-if="prodImage" class="prod-image position-absolute overflow-hidden" :style="{ 'width': this.prodImageSize.width+'px', 'height': this.prodImageSize.height+'px', 'left': this.prodImagePos.left+'px', 'top': this.prodImagePos.top+'px'}">
                                    <b-img :src="prodImage" class="position-absolute w-100 h-100" :style="{ 'left': '0px', 'top': '0px', 'transform': `scale(${this.prodImageScale})` }" ref="prod-image" />
                                </div>
                                <div v-if="prodTitle"
                                    class="position-absolute"
                                    style="width: 300px; left: 35px; top: 246px; color: #000; font-family: 'NanumSquare', san-serif; letter-spacing: -1px; font-weight: bold; white-space: pre-line; text-align: center"
                                    :style="{ 'height': this.brCount > 0 ? '48px' : '20px', 'top': this.brCount > 0 ? '226px' : '244px', 'font-size': this.brCount > 0 ? '18px' : '20px', 'line-height': this.brCount > 0 ? '24px' : '20px' }">
                                    {{prodTitle}}
                                </div>
                                <div v-if="promText"
                                    class="position-absolute prod-text"
                                    style="width: 100%; height: auto; left: 0; top: 0; color: #000; font-family: 'NanumSquare', san-serif; letter-spacing: -1px; font-weight: bold; white-space: pre-line;">
                                    <span>{{promText}}</span>
                                </div>
                            </template>
                            <template v-if="tempImageType == 440">
                                <img :src="tempImage" />
                                <div class="position-absolute" style="width: 350px; height: 350px; left: 45px; top: 10px; background-color: white"></div><!-- 커버 -->
                                <div class="position-absolute" style="width: 365px; height: 72px; left: 30px; top: 400px; background-color: white"></div><!-- 커버 -->
                                <div v-if="prodImage" class="prod-image position-absolute overflow-hidden" :style="{ 'width': this.prodImageSize.width+'px', 'height': this.prodImageSize.height+'px', 'left': this.prodImagePos.left+'px', 'top': this.prodImagePos.top+'px'}">
                                    <b-img :src="prodImage" class="position-absolute w-100 h-100" :style="{ 'left': '0px', 'top': '0px', 'transform': `scale(${this.prodImageScale})` }" ref="prod-image" />
                                </div>
                                <div v-if="prodTitle"
                                    class="position-absolute prod-title"
                                    style="width: 365px; height: 72px; left: 30px; top: 400px; font-size: 24px; line-height: 1.5; color: #000; font-family: 'KoPub Dotum', san-serif; white-space: pre-line">
                                    <span style="border-bottom: 2px solid black">{{prodTitle}}</span>
                                </div>
                                <div v-if="promText"
                                    class="position-absolute prod-text"
                                    style="width: 100%; height: auto; left: 0; top: 0; font-size: 24px; line-height: 1.5; color: #000; font-family: 'KoPub Dotum', san-serif; white-space: pre-line">
                                    <span>{{promText}}</span>
                                </div>
                            </template>
                        </div>
                        <div v-else>
                            <div class="mb-3">STEP 1) 템플릿 선택<br>이곳에 템플릿을 드래그하여 불러옵니다.</div>
                            <div class="mb-3">STEP 2) 상품 선택<br>템플릿 위에 상품이미지를 드래그하여 불러옵니다.</div>
                            <div class="mb-3">STEP 3) 수정·저장<br>필요에 따라 상품이미지의 크기, 위치, 상품명 등을 수정하고 이미지를 저장하세요.</div>
                        </div>
                    </div>
                </b-col>
                <b-col>
                    <template v-if="tempImageType == 232">
                        <b-card header="예스쿠폰 OLD 옵션" body-class="p-2" class="mb-3">
                            <b-form-checkbox v-model="hasPartnerLogo">제휴사 로고 보이기</b-form-checkbox>
                        </b-card>
                    </template>
                    <template>
                        <b-card header="상품이미지 위치" body-class="p-2" class="mb-3">
                            <b-row no-gutters>
                                <b-col><b-btn size="sm" variant="link" @click="move('-10px', '+10px')"><small><b-icon icon="chevron-double-left" rotate="45" /></small></b-btn></b-col>
                                <b-col></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="moveVert('+10px')"><small><b-icon icon="chevron-double-up" /></small></b-btn></b-col>
                                <b-col></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="move('+10px', '+10px')"><small><b-icon icon="chevron-double-right" rotate="-45" /></small></b-btn></b-col>
                            </b-row>
                            <b-row no-gutters>
                                <b-col></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="move('-1px', '+1px')"><small><b-icon icon="chevron-left" rotate="45" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="moveVert('+1px')"><small><b-icon icon="chevron-up" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="move('+1px', '+1px')"><small><b-icon icon="chevron-right" rotate="-45" /></small></b-btn></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row no-gutters>
                                <b-col><b-btn size="sm" variant="link" @click="moveHori('-10px')"><small><b-icon icon="chevron-double-left" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="moveHori('-1px')"><small><b-icon icon="chevron-left" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="resetPos"><small><b-icon icon="circle-fill" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="moveHori('+1px')"><small><b-icon icon="chevron-right" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="moveHori('+10px')"><small><b-icon icon="chevron-double-right" /></small></b-btn></b-col>
                            </b-row>
                            <b-row no-gutters>
                                <b-col></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="move('-1px', '-1px')"><small><b-icon icon="chevron-left" rotate="-45" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="moveVert('-1px')"><small><b-icon icon="chevron-down" /></small></b-btn></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="move('+1px', '-1px')"><small><b-icon icon="chevron-right" rotate="45" /></small></b-btn></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row no-gutters>
                                <b-col><b-btn size="sm" variant="link" @click="move('-10px', '-10px')"><small><b-icon icon="chevron-double-left" rotate="-45" /></small></b-btn></b-col>
                                <b-col></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="moveVert('-10px')"><small><b-icon icon="chevron-double-down" /></small></b-btn></b-col>
                                <b-col></b-col>
                                <b-col><b-btn size="sm" variant="link" @click="move('+10px', '-10px')"><small><b-icon icon="chevron-double-right" rotate="45" /></small></b-btn></b-col>
                            </b-row>
                        </b-card>
                        <b-card header="상품이미지 크기" body-class="p-2" class="mb-3">
                            <b-row no-gutters>
                                <b-col><b-btn class="px-0 text-decoration-none" size="sm" variant="link" @click="scaleTo(-0.1)">-0.1</b-btn></b-col>
                                <b-col><b-btn class="px-0 text-decoration-none" size="sm" variant="link" @click="scaleTo(-0.01)">-0.01</b-btn></b-col>
                                <b-col><b-btn class="px-0 text-decoration-none" size="sm" variant="link" @click="resetScale()"><small><b-icon icon="circle-fill" /></small></b-btn></b-col>
                                <b-col><b-btn class="px-0 text-decoration-none" size="sm" variant="link" @click="scaleTo(+0.01)">+0.01</b-btn></b-col>
                                <b-col><b-btn class="px-0 text-decoration-none" size="sm" variant="link" @click="scaleTo(+0.1)">+0.1</b-btn></b-col>
                            </b-row>
                        </b-card>
                    </template>
                    <b-btn class="mb-2" block variant="secondary" accesskey="c" @click="resetTemplate">초기화</b-btn>
                    <b-btn class="mb-2" block variant="primary" accesskey="s" @click="saveTemplate">이미지 저장 <small>(Alt + s)</small></b-btn>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
// import _ from 'lodash'
import html2canvas from 'html2canvas'

export default {
    data: function() {
        return {
            tempFile: null,
            tempImage: null,
            tempImageType: null,
            prodImage: null,
            prodImageSize: { width: 0, height: 0 },
            prodImagePos: { left: 0, top: 0 },
            prodImageScale: 1,
            prodTitle: null,
            promText: null,
            hasPartnerLogo: true,
        }
    },
    computed: {
        brCount: function() {
            return this.prodTitle ? (this.prodTitle.match(/\n/g) || []).length : 0
        }
    },
    created: function() {
        document.addEventListener('keydown', this.execShortCut)
    },
    destroyed: function() {
        document.removeEventListener('keydown', this.execShortCut)
    },
    methods: {
        execShortCut: function(e) {
            if (KeyboardEvent) {
                if (e.key == 'Escape') {
                    try {
                        document.activeElement.blur()
                    } catch (e) {
                        console.log(e)
                    }
                }
                if (document.activeElement.tagName.toUpperCase() == 'BODY') {
                    switch (e.key) {
                        case "+":
                            if (this.prodImage) {
                                if (e.altKey) {
                                    this.prodImageScale += 0.01
                                } else {
                                    this.prodImageScale += 0.1
                                }
                            }
                            break;
                        case "-":
                            if (this.prodImage) {
                                if (e.altKey) {
                                    this.prodImageScale -= 0.01
                                } else {
                                    this.prodImageScale -= 0.1
                                }
                            }
                            break;
                        case "ArrowUp":
                            if (this.prodImage) {
                                if (e.shiftKey) {
                                    this.$refs['prod-image'].style.top = `calc(${this.$refs['prod-image'].style.top} - 10px)`
                                } else {
                                    this.$refs['prod-image'].style.top = `calc(${this.$refs['prod-image'].style.top} - 1px)`
                                }
                            }
                            break;
                        case "ArrowDown":
                            if (this.prodImage) {
                                if (e.shiftKey) {
                                    this.$refs['prod-image'].style.top = `calc(${this.$refs['prod-image'].style.top} + 10px)`
                                } else {
                                    this.$refs['prod-image'].style.top = `calc(${this.$refs['prod-image'].style.top} + 1px)`
                                }
                            }
                            break;
                        case "ArrowLeft":
                            if (this.prodImage) {
                                if (e.shiftKey) {
                                    this.$refs['prod-image'].style.left = `calc(${this.$refs['prod-image'].style.left} - 10px)`
                                } else {
                                    this.$refs['prod-image'].style.left = `calc(${this.$refs['prod-image'].style.left} - 1px)`
                                }
                            }
                            break;
                        case "ArrowRight":
                            if (this.prodImage) {
                                if (e.shiftKey) {
                                    this.$refs['prod-image'].style.left = `calc(${this.$refs['prod-image'].style.left} + 10px)`
                                } else {
                                    this.$refs['prod-image'].style.left = `calc(${this.$refs['prod-image'].style.left} + 1px)`
                                }
                            }
                            break;
                        case "0":
                            if (this.prodImage) {
                                console.log('press 0')
                                this.$refs['prod-image'].style.left = 'calc(0px)'
                                this.$refs['prod-image'].style.top = 'calc(0px)'
                                this.prodImageScale = 1;
                            }
                            break;
                    }
                }
            }
        },
        moveHori: function(n) {
            if (!this.prodImage) return
            this.$refs['prod-image'].style.left = `calc(${this.$refs['prod-image'].style.left} + ${n})`
        },
        moveVert: function(n) {
            if (!this.prodImage) return
            this.$refs['prod-image'].style.top = `calc(${this.$refs['prod-image'].style.top} - ${n})`
        },
        move: function(left, top) {
            if (!this.prodImage) return
            this.$refs['prod-image'].style.left = `calc(${this.$refs['prod-image'].style.left} + ${left})`
            this.$refs['prod-image'].style.top = `calc(${this.$refs['prod-image'].style.top} - ${top})`
        },
        resetPos: function() {
            if (!this.prodImage) return
            this.$refs['prod-image'].style.left = '0px'
            this.$refs['prod-image'].style.top = '0px'
        },
        scaleTo: function(n) {
            if (!this.prodImage) return
            this.prodImageScale += n
        },
        resetScale: function() {
            if (!this.prodImage) return
            this.prodImageScale = 1
        },
        dropTempImg: function(e) {
            e.preventDefault()
            e.stopPropagation()
            if (e.dataTransfer.files.length !== 1) {
                alert('파일을 하나만 업로드하세요')
                return
            }
            const file = e.dataTransfer.files[0]
            if (file.type.indexOf('image/') < 0) {
                alert('이미지 파일을 드롭하세요')
                return
            }

            this.tempFile = file

            const reader = new FileReader()
            reader.onload = () => {
                // console.log('reader.result => ', reader.result)
                const image = new Image()
                image.src = reader.result
                image.onload = () => {

                    if (image.width != 440 && image.width != 370 && image.width != 232) {
                         alert('올바른 템플릿 사이즈가 아닙니다.')
                         return
                    }

                    this.tempImage = reader.result

                    if (image.width == 440) { // 아이넘버
                        this.tempImageType = 440
                        this.prodImageSize = { width: 350, height: 350 }
                        this.prodImagePos = { left: 45, top: 10 }
                    } else if (image.width == 370) { // 예스쿠폰 NEW
                        this.tempImageType = 370
                        this.prodImageSize = { width: 190, height: 190 }
                        this.prodImagePos = { left: 90, top: 68 }
                    } else if (image.width == 232) { // 예스쿠폰 OLD
                        this.tempImageType = 232
                        this.prodImageSize = { width: 104, height: 98 }
                        this.prodImagePos = { left: 0, top: 26 }
                    }

                }
                image.remove()
            }
            reader.readAsDataURL(file)
        },
        dragoverTempImg: function(e) {
            e.preventDefault()
            e.stopPropagation()
        },
        dropProdImg: function(e) {
            e.preventDefault()
            e.stopPropagation()
            if (e.dataTransfer.files.length !== 1) {
                alert('파일을 하나만 업로드하세요')
                return
            }
            const file = e.dataTransfer.files[0]
            if (file.type.indexOf('image/') < 0) {
                alert('이미지 파일을 드롭하세요')
                return
            }
            const reader = new FileReader()
            reader.onload = () => {
                const image = new Image()
                image.src = reader.result
                image.onload = () => {

                    this.prodTitle = file.name.slice(0, file.name.lastIndexOf('.')).replace(/^[\-_]$/gi, " ").replace(/[_\+\-]/g, " ")
                    this.prodImage = reader.result

                }
                image.remove()
            }
            reader.readAsDataURL(file)
        },
        dragoverProdImg: function(e) {
            e.preventDefault()
            e.stopPropagation()
        },
        resetTemplate: function() {
            this.tempFile = null
            this.tempImage = null
            this.tempImageType = null
            this.prodImage = null
            this.prodImageScale = 1
            this.prodTitle = null
            this.promText = null
            this.hasPartnerLogo = true
        },
        saveTemplate: function() {

            if (!this.tempFile) {
                alert('기존 템플릿을 박스 안에 드롭다운 하세요.')
                return
            }

            document.documentElement.scrollTop = 0
            document.documentElement.classList.add('overflow-hidden')

            const preview = document.querySelector('.preview')

            // console.log(
            //     this.tempFile,
            //     this.tempFile.type,
            //     this.tempFile.name.slice(this.tempFile.name.lastIndexOf(".")+1, this.tempFile.name.length)
            // )

            setTimeout(() => {
                html2canvas(preview).then((canvas) => {
                    canvas.toBlob((blob) => {
                        let reader = new FileReader()
                        reader.readAsDataURL(blob)
                        reader.addEventListener("load", () => {

                            let url = URL.createObjectURL(blob);
                            let a = document.createElement("a")
                            a.setAttribute("style", "display: none")
                            a.setAttribute("href", url)
                            a.setAttribute("target", "_blank")
                            a.setAttribute("download", `${this.prodTitle}.${this.tempFile.name.slice(this.tempFile.name.lastIndexOf(".")+1, this.tempFile.name.length)}`)
                            document.body.appendChild(a)
                            a.click()
                            URL.revokeObjectURL(url);
                            a.remove()

                        }, false)
                    }, this.tempFile.type, 1)
                    setTimeout(() => {
                        document.documentElement.classList.remove('overflow-hidden')
                    }, 300)
                });
            }, 300)
        }
    }
}
</script>

<style lang="scss" scoped>
    .prod-image:focus {
        outline: 3px dashed rgba(#007bff, .3);
    }
</style>