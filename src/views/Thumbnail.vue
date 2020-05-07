<template>
    <div>
        <div class="steps border-bottom text-left">
            <b-container>
                <b-row no-gutters>
                    <b-col cols="4" class="border-left border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">이미지 선택 <small class="text-muted">(Alt + i)</small></h6>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-file accept="image/*" id="image" accesskey="i" placeholder="이미지 선택" @input="selectImage" />
                            </b-form-group>
                        </b-card>
                    </b-col>
                    <b-col class="border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">이미지 확대/축소 <small class="text-muted">(Alt + c, 0부터 1까지의 소수점)</small></h6>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-input type="number" id="scale" accesskey="c" min="0.1" max="10" step=".1" v-model="scale" />
                            </b-form-group>
                        </b-card>
                    </b-col>
                    <b-col class="border-right">
                        <b-card class="border-0" style="height: 8rem;">
                            <template v-slot:header>
                                <h6 class="mb-0">출력할 사이즈 <small class="text-muted">(Alt + z, 입력 후 콤마 or 스페이스 or 엔터)</small></h6>
                            </template>
                            <b-form-group class="mb-0">
                                <b-form-tags v-model="sizes" id="sizes" separator=" ,;" remove-on-delete placeholder="" accesskey="z" />
                            </b-form-group>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <b-container class="py-4 my-4">
            <b-row no-gutters>
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
                <b-col cols="8">
                    <b-card no-body style="width: calc(640px + 2px); height: calc(640px + 2px); padding: 0" class="mx-auto rounded-0">
                        <div class="preview position-relative overflow-hidden">
                            <b-card-body style="width: 640px; height: 640px;" class="bg-white p-0 d-flex align-items-center justify-content-center">
                                <b-img :src="image" v-if="image" :style="{ 'position': 'relative', 'transform': 'scale('+ scale +')', 'top' : top +'px', 'left' : left +'px'} " />
                                <p class="mb-0" v-else>
                                    이미지를 먼저 선택하세요.
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
                    <div class="controls position-relative mx-auto mb-4" style="width: 160px; height: 160px;">
                        <!-- 원점 -->
                        <b-btn variant="outline-secondary" class="p-0 position-absolute top" @click="resetPos()" style="width: 2rem; height: 2rem; top: calc(50% - 1rem); left: calc(50% - 1rem)">0</b-btn>
                        <!-- 상 -->
                        <b-btn variant="outline-secondary" class="p-0 position-absolute top" @click="moveToTop(-10)" style="width: 2rem; height: 2rem; top: 0; left: calc(50% - 1rem)">10</b-btn>
                        <b-btn variant="outline-secondary" class="p-0 position-absolute top" @click="moveToTop(-1)" style="width: 2rem; height: 2rem; top: calc(2rem + 2px); left: calc(50% - 1rem)">1</b-btn>
                        <!-- 하 -->
                        <b-btn variant="outline-secondary" class="p-0 position-absolute bottom" @click="moveToTop(10)" style="width: 2rem; height: 2rem; bottom: 0; left: calc(50% - 1rem)">10</b-btn>
                        <b-btn variant="outline-secondary" class="p-0 position-absolute bottom" @click="moveToTop(1)" style="width: 2rem; height: 2rem; bottom: calc(2rem + 2px); left: calc(50% - 1rem)">1</b-btn>
                        <!-- 좌 -->
                        <b-btn variant="outline-secondary" class="p-0 position-absolute left" @click="moveToLeft(-10)" style="width: 2rem; height: 2rem; left: 0; top: calc(50% - 1rem)">10</b-btn>
                        <b-btn variant="outline-secondary" class="p-0 position-absolute left" @click="moveToLeft(-1)" style="width: 2rem; height: 2rem; left: calc(2rem + 2px); top: calc(50% - 1rem)">1</b-btn>
                        <!-- 우 -->
                        <b-btn variant="outline-secondary" class="p-0 position-absolute right" @click="moveToLeft(10)" style="width: 2rem; height: 2rem; right: 0; top: calc(50% - 1rem)">10</b-btn>
                        <b-btn variant="outline-secondary" class="p-0 position-absolute right" @click="moveToLeft(1)" style="width: 2rem; height: 2rem; right: calc(2rem + 2px); top: calc(50% - 1rem)">1</b-btn>
                    </div>
                    <!-- <b-btn block class="mb-2" @click="toggleGuideline" variant="">가이드 <span v-text="visibleGuideline ? '끄기' : '켜기'"></span></b-btn> -->
                    <b-form-group>
                        <b-form-checkbox switch v-model="visibleGuideline" accesskey="g">가이드라인 <small class="text-muted">(alt + g)</small></b-form-checkbox>
                    </b-form-group>
                    <b-form-text>이미지를 저장하기 전에 반드시 가이드라인을 끄고 저장하세요.</b-form-text>
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
            sizes: [640, 360],
            visibleGuideline: false
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
            console.log('execShortCut', e, e == 'KeyboardEvent')
            if (KeyboardEvent) {
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
                        }
                        break;
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
                        this.scale = 500 / image.width
                    } else {
                        this.scale = 500 / image.height
                    }
                    this.image = reader.result || null;
                    try {
                        document.querySelector('.preview').focus();
                    } catch (e) {
                        console.log(e);
                    }
                }
                image.remove()

            }, false)

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

            document.documentElement.scrollTop = 0

            const prevew = document.querySelector('.preview')

            this.sizes.forEach(size => {
                if (size > 0) {
                    html2canvas(prevew, { scale: size / 640 }).then((canvas) => {
                        console.log(canvas, size, 1 - (size / 3840))
                        canvas.toBlob((blob) => {
                            let reader = new FileReader()
                            reader.readAsDataURL(blob)
                            reader.addEventListener("load", () => {

                                let url = URL.createObjectURL(blob);
                                let a = document.createElement("a")
                                a.setAttribute("style", "display: none")
                                a.setAttribute("href", url)
                                a.setAttribute("target", "_blank")
                                a.setAttribute("download", this.file.name.substring(0, this.file.name.lastIndexOf('.')) +'_'+ size +'.'+ this.file.name.substring(this.file.name.lastIndexOf('.') + 1, this.file.name.length))
                                document.body.appendChild(a)
                                a.click()
                                URL.revokeObjectURL(url);
                                a.remove()

                            }, false)
                        }, this.file.type, 1 - (size / 3840))
                    });
                }
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
    }
}
</script>