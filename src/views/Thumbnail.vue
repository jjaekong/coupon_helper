<template>
    <div>
        <div class="steps border-bottom text-left">
            <b-container>
                <b-row no-gutters>
                    <b-col class="border-left border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">이미지 선택 <small class="text-muted">(Alt + i)</small></h6>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-file accept="image/*" id="image" accesskey="i" placeholder="이미지 선택" @input="selectImage" />
                            </b-form-group>
                        </b-card>
                    </b-col>
                    <!-- <b-col cols="3" class="border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">이미지 확대/축소 <small class="text-muted">(Alt + c)</small></h6>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-input type="number" id="scale" accesskey="c" min="0.1" max="10" step=".1" v-model="scale" />
                            </b-form-group>
                        </b-card>
                    </b-col> -->
                    <b-col class="border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">출력할 사이즈 <small class="text-muted">(Alt + z, 입력 후 콤마 or 스페이스 or 엔터)</small></h6>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-tags v-model="sizes" input-id="sizes" separator=" ,;" remove-on-delete placeholder="" accesskey="z" input-type="number" />
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
                    <b-card no-body style="width: calc(640px + 2px); height: calc(640px + 2px); padding: 0" class="mx-auto rounded-0">
                        <div class="preview position-relative overflow-hidden">
                            <b-card-body style="width: 640px; height: 640px;" class="bg-white p-0 d-flex align-items-center justify-content-center">
                                <b-img :src="image" v-if="image" :style="{ 'position': 'relative', 'transform': 'scale('+ scale +')', 'top' : top +'px', 'left' : left +'px'} " />
                                <p class="mb-0" v-else>
                                    이미지를 선택하세요.
                                </p>
                            </b-card-body>
                            <div class="guideline" style="width: 500px; height: 500px; border: 2px dashed #eee; position: absolute; top: 70px; left: 70px; z-idnex: 999;" v-if="visibleGuideline">
                                <span style="position: absolute; top: calc(50% - 1px); left: 0; width: 100%; height: 0; border-top: 2px dashed #eee;" />
                                <span style="position: absolute; top: 0; left: calc(50% - 1px); width: 0; height: 100%; border-left: 2px dashed #eee;" />
                            </div>
                        </div>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card class="mb-3">
                        <template v-slot:header>
                            확대/축소
                        </template>
                        <b-form-group>
                            <!-- <b-form-input type="number" min="0" max="1" /> -->
                            <b-form-input type="number" id="scale" accesskey="c" min="0.1" max="10" step=".1" v-model="scale" />
                        </b-form-group>
                        <b-row no-gutters>
                            <b-col><b-btn @click="scaleTo(-0.1)" size="sm" class="p-1">-0.1</b-btn></b-col>
                            <b-col><b-btn @click="scaleTo(-0.01)" size="sm" class="p-1">-0.01</b-btn></b-col>
                            <b-col><b-btn @click="scaleTo(0.01)" size="sm" class="p-1">+0.01</b-btn></b-col>
                            <b-col><b-btn @click="scaleTo(0.1)" size="sm" class="p-1">+0.1</b-btn></b-col>
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
                    <!-- <b-btn block class="mb-2" @click="toggleGuideline" variant="">가이드 <span v-text="visibleGuideline ? '끄기' : '켜기'"></span></b-btn> -->
                    <b-form-group>
                        <b-form-checkbox switch v-model="visibleGuideline" accesskey="g">가이드라인 <small class="text-muted">(alt + g)</small></b-form-checkbox>
                    </b-form-group>
                    <b-btn class="mt-3" block variant="primary" @click="saveThumbnails" accesskey="s">이미지 저장 <small>(Alt + s)</small></b-btn>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
    data: function() {
        return {
            file: null,
            image: null,
            top: 0,
            left: 0,
            scale: 1,
            sizes: [640],
            savedScale: 1,
            visibleGuideline: true
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
            // console.log('execShortCut', e, e == 'KeyboardEvent', document.activeElement.tagName)
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
                            if (this.image) {
                                if (e.altKey) {
                                    this.scale += 0.01
                                } else {
                                    this.scale += 0.1
                                }
                            }
                            break;
                        case "-":
                            if (this.image) {
                                if (e.altKey) {
                                    this.scale -= 0.01
                                } else {
                                    this.scale -= 0.1
                                }
                            }
                            break;
                        case "ArrowUp":
                            if (this.image) {
                                if (e.shiftKey) {
                                    this.top -= 10
                                } else {
                                    this.top -= 1
                                }
                            }
                            break;
                        case "ArrowDown":
                            if (this.image) {
                                if (e.shiftKey) {
                                    this.top += 10
                                } else {
                                    this.top += 1
                                }
                            }
                            break;
                        case "ArrowLeft":
                            if (this.image) {
                                if (e.shiftKey) {
                                    this.left -= 10
                                } else {
                                    this.left -= 1
                                }
                            }
                            break;
                        case "ArrowRight":
                            if (this.image) {
                                if (e.shiftKey) {
                                    this.left += 10
                                } else {
                                    this.left += 1
                                }
                            }
                            break;
                        case "0":
                            if (this.image) {
                                this.left = 0;
                                this.top = 0;
                                this.scale = this.savedScale;
                            }
                            break;
                    }
                }
            }
        },
        selectImage: function(file) {
            // 파일이 선택되었는지
            if (!file) {
                return false;
            }
            // 선택한 파일이 이미지인지
            if (file.type.indexOf("image") < 0) {
                alert('이미지를 선택하세요.');
                return false;
            }

            this.file = file

            // 선택한 이미지 읽어와서 화면에 출력하기
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.addEventListener("load", () => {
                const image = new Image()
                image.src = reader.result
                image.onload = () => {
                    if (image.width > image.height) {
                        this.scale = this.savedScale = 500 / image.width
                    } else {
                        this.scale = this.savedScale = 500 / image.height
                    }
                    this.image = reader.result || null;
                }
                image.remove()

            }, false)

            try {
                document.activeElement.blur();
            } catch(e) {
                console.log(e);
            }
        },
        saveThumbnails: function() {

            if (!this.image) {
                alert('선택된 이미지가 없습니다. 이미지를 선택하세요.');
                document.getElementById('image').focus();
                return;
            }
            if (this.sizes.length == 0) {
                alert('출력할 사이즈를 하나 이상 입력하세요.');
                document.getElementById('sizes').focus();
                return;
            }

            let visibleGuideline = this.visibleGuideline

            this.visibleGuideline = false

            document.documentElement.scrollTop = 0

            const preview = document.querySelector('.preview')

            let results = new Array()
            
            this.sizes.forEach(() => {
               results.push(false) 
            });

            setTimeout(() => {
                this.sizes.forEach((size, index) => {
                    if (size > 0) {
                        html2canvas(preview, { scale: size / 640 }).then((canvas) => {
                            // console.log(canvas, size, 1 - (size / 3840))
                            canvas.toBlob((blob) => {
                                let reader = new FileReader()
                                reader.readAsDataURL(blob)
                                reader.addEventListener("load", () => {

                                    let url = URL.createObjectURL(blob);
                                    let a = document.createElement("a")
                                    a.setAttribute("style", "display: none")
                                    a.setAttribute("href", url)
                                    a.setAttribute("target", "_blank")
                                    a.setAttribute("download", this.file.name.substring(0, this.file.name.lastIndexOf('.')) +'_'+ size +'.jpg')
                                    document.body.appendChild(a)
                                    a.click()
                                    URL.revokeObjectURL(url);
                                    a.remove()

                                    results[index] = true

                                }, false)
                            }, 'image/jpeg', 1 - (size / 640 * 6))
                        });
                    } else {
                        results[index] = true
                    }
                })
            }, 500)

            new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (results.every(result => result == true)) {
                        clearInterval(interval)
                        resolve()
                    }
                }, 10)
            })
            .then(() => {
                this.visibleGuideline = visibleGuideline
            })
            .catch((error) => {
                console.log(error)
                this.visibleGuideline = visibleGuideline
            })
        },
        moveToLeft: function(left) {
            this.left += left
        },
        moveToTop: function(top) {
            this.top += top
        },
        resetPos: function() {
            this.left = 0
            this.top = 0
        },
        scaleTo: function(scale) {
            this.scale += scale
        },
    }
}
</script>

<style lang="scss">
label[for="image"].custom-file-label {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>