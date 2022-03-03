<script setup>
import { ref } from 'vue'
import PsiButton from '../components/PsiButton.vue'
import PsikotesNavbar from '../components/PsikotesNavbar.vue'
import PsikotesPilgan from '../components/PsikotesPilgan.vue'
import FormInput from '../components/FormInput.vue'
import PsikotesAngka from '../components/PsikotesAngka.vue'
import PsikotesMultichoice from '../components/PsikotesMultichoice.vue'
import PsikotesOpini from '../components/PsikotesOpini.vue'
import PsikotesKelompok from '../components/PsikotesKelompok.vue'

const dummySoals = ref([
  {
    nomor: 1,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'pilgan_y',
    opsi: [
      { text: '<p>Contoh Opsi A</p>', value: 'A' },
      { text: '<p>Contoh Opsi B</p>', value: 'B' },
      { text: '<p>Contoh Opsi C</p>', value: 'C' },
      { text: '<p>Contoh Opsi D</p>', value: 'D' },
      { text: '<p>Contoh Opsi E</p>', value: 'E' }
    ],
    jawaban: ''
  },
  {
    nomor: 2,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'pilgan_x',
    opsi: [
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'A'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'B'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'C'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'D'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'E'
      }
    ],
    jawaban: ''
  },
  {
    nomor: 3,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'uraian',
    jawaban: ''
  },
  {
    nomor: 4,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'angka',
    jawaban: []
  },
  {
    nomor: 5,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'multichoice_y',
    opsi: [
      { text: '<p>Contoh Multichoice A</p>', value: 'A' },
      { text: '<p>Contoh Multichoice B</p>', value: 'B' },
      { text: '<p>Contoh Multichoice C</p>', value: 'C' },
      { text: '<p>Contoh Multichoice D</p>', value: 'D' },
      { text: '<p>Contoh Multichoice E</p>', value: 'E' }
    ],
    jawaban: []
  },
  {
    nomor: 6,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'multichoice_x',
    opsi: [
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'A'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'B'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'C'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'D'
      },
      {
        text: '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />',
        value: 'E'
      }
    ],
    jawaban: []
  },
  {
    nomor: 7,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'opini',
    jawaban: ''
  },
  {
    nomor: 8,
    soal: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus.</p>',
    tipe_soal: 'kelompok',
    opsi: 'Visual',
    jawaban: ''
  }
])
</script>

<template>
  <div class="relative">
    <psikotes-navbar
      alat-tes="Tes KMB"
      kelompok-tes="tes 1"
      :timer="true"
      class="mb-5"
    ></psikotes-navbar>
    <div class="flex flex-col gap-10">
      <div
        v-for="(soal, i) in dummySoals"
        :key="i"
        class="rounded-lg bg-white p-10 shadow-xl"
      >
        <div class="mx-auto max-w-4xl">
          <p class="mb-4 text-sm text-gray-500">Soal Nomor {{ soal.nomor }}</p>
          <div class="psi-editor max-w-full" v-html="soal.soal"></div>
          <div class="mx-auto mt-7 max-w-4xl">
            <psikotes-pilgan
              v-if="
                soal.tipe_soal === 'pilgan_y' || soal.tipe_soal === 'pilgan_x'
              "
              v-model="soal.jawaban"
              :opsi="soal.opsi"
              :direction="soal.tipe_soal === 'pilgan_y' ? 'y' : 'x'"
            ></psikotes-pilgan>
            <form-input
              v-else-if="soal.tipe_soal === 'uraian'"
              v-model="soal.jawaban"
              label="Jawaban"
            />
            <psikotes-angka
              v-else-if="soal.tipe_soal === 'angka'"
              v-model="soal.jawaban"
            />
            <psikotes-multichoice
              v-else-if="
                soal.tipe_soal === 'multichoice_y' ||
                soal.tipe_soal === 'multichoice_x'
              "
              v-model="soal.jawaban"
              :opsi="soal.opsi"
              :direction="soal.tipe_soal === 'multichoice_y' ? 'y' : 'x'"
            />
            <psikotes-opini
              v-else-if="soal.tipe_soal === 'opini'"
              v-model="soal.jawaban"
            />
            <psikotes-kelompok
              v-else-if="soal.tipe_soal === 'kelompok'"
              v-model="soal.jawaban"
              :opsi="soal.opsi"
            />
            <div
              v-else-if="soal.tipe_soal === 'membaca'"
              class="text-center text-gray-500"
            >
              Soal ini tidak perlu dijawab
            </div>
            <div v-else class="text-center text-gray-500">
              Jenis soal tidak terdaftar, silahkan hubungi admin
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <psi-button>Lanjut Kelompok Tes Berikutnya</psi-button>
      </div>
    </div>
  </div>
</template>
