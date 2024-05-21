<script lang="ts" setup>
import { Ref, ref, computed } from "vue";


export type TCol = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

export interface IProps {
  cols: TCol;
  xsCols?: TCol;
  smCols?: TCol;
  mdCols?: TCol;
  lgCols?: TCol;
  xlCols?: TCol;
  uploadedFiles: File[];
}

const props = defineProps<IProps>();
const emit = defineEmits(["on-files-change"]);
const imageUploadRef: Ref<HTMLInputElement> = ref();


const computedFiles = computed({
  get: () => props.uploadedFiles,
  set: (newFiles: File[]) => {
    emit("on-files-change", newFiles);
  },
});

const handleFilesChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files.length === 0) return;
  const newFiles = [...props.uploadedFiles,]
  for (let i = 0; i < files.length; i++) {
    if (
      files[i].type !== 'image/jpeg' &&
      files[i].type !== 'image/png' &&
      files[i].type !== 'image/jpg' &&
      files[i].type !== 'image/x-png' &&
      files[i].type !== 'image/bmp' &&
      files[i].type !== 'image/gif'
    ) {
      alert("Only Image files are allowed")
      continue;
    }
    else {
      newFiles.push(files[i]);
    }
  }


  emit("on-files-change", newFiles);
};

const handleRemoveFile = (file: File) => {
  const newFiles = props.uploadedFiles.filter((f) => f !== file);
  emit("on-files-change", newFiles);
};




const handleUploadInputClick = () => {
  imageUploadRef.value.click();
};
</script>


<template>
  <div class="d-flex align-center pa-3 rounded-xl bg-light-grey flex-column-reverse flex-md-row">
    <v-container fluid>
      <v-row>
        <v-col v-for="(file, index) in computedFiles" :key="file.name + index" :cols="props.cols" :xs="props.xlCols"
          :sm="props.smCols" :md="props.mdCols" :lg="props.lgCols" :xl="props.xlCols">
          <div class="d-flex align-center ">
            <span class="upload-icon-container d-inline-flex align-center flex-shrink-0 px-2 mr-2">
              <v-icon class="text-h4 text-medium-emphasis">mdi-cloud-upload-outline</v-icon>
            </span>

            <div class="d-flex align-center justify-space-between flex-grow-1 pb-1 border-bottom-grey">
              <p class="text-caption font-weight-bold text-medium-emphasis">
                {{ file.name }}
              </p>
              <p class="text-caption font-weight-bold text-medium-emphasis">
                {{ (file.size / 1024).toFixed(2) }} KB
              </p>

              <div class="d-flex">
                <v-icon class="rounded-circle pa-3 text-body-2 cursor-pointer cross-icon" @click="handleRemoveFile(file)">
                  mdi-close
                </v-icon>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="flex-shrink-1 pa-6 rounded-xl upload-btn-container">
      <button class="d-flex flex-column align-center text-on-surface" @click="handleUploadInputClick">
        <v-icon class="text-h4">mdi-cloud-upload-outline</v-icon>
        <p class="font-weight-medium text-caption">Upload Picture of Update</p>
      </button>
    </div>

    <input hidden multiple ref="imageUploadRef" type="file" name="img-upload" id="img-upload"
      accept="image/x-png,image/png,image/bmp,image/gif,image/jpeg,image/jpg" @change.prevent="handleFilesChange" />
  </div>
</template>

<style scoped>
.border-bottom-grey {
  border-bottom: 3px solid #b4b4b4;
}

.cross-icon {
  background-color: #969a9f;
  color: #fff;
}

.upload-icon-container {
  width: 50px;
  height: 50px;
  background-color: #dbdbdb;
  border-radius: 10px;
}

.upload-btn-container {
  display: flex;
  align-items: center;
  background-color: #dbdbdb;
  height: 100%;
}
</style>
