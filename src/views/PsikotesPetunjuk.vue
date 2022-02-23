<script setup>
import PsiButton from '../components/PsiButton.vue'
import PsikotesNavbar from '../components/PsikotesNavbar.vue'
const dummyPetunjuk =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget elementum erat, at sagittis magna. Suspendisse sem velit, viverra non convallis eget, pulvinar ut ligula. Curabitur ut congue massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis at euismod purus. Mauris tempor ipsum urna, a lacinia nunc finibus vitae. Cras diam sem, interdum at arcu nec, finibus consequat nisl. Curabitur fringilla cursus urna. Aenean imperdiet ligula risus, ac vestibulum orci dapibus sit amet. Praesent vel sagittis erat. Nam feugiat eros varius, semper purus id, viverra turpis. Duis sagittis nulla lectus, imperdiet sollicitudin lectus tincidunt vel. Praesent sed lectus quam. Mauris convallis at augue sit amet accumsan.</p><p>Nullam vel sapien eget risus iaculis pretium. Donec luctus felis vitae sagittis hendrerit. Pellentesque egestas neque at dignissim lacinia. Nullam sed neque magna. Suspendisse vestibulum interdum augue eget vulputate. In id eros suscipit, lacinia lectus convallis, feugiat est. Cras non orci viverra urna finibus facilisis sit amet vitae massa. Quisque ut condimentum dolor. Nam varius risus nisl, eu dapibus lorem blandit id. Sed ac ligula quis orci sagittis semper. Nam nibh neque, euismod vel est non, ornare laoreet purus. Quisque sed metus placerat, pharetra nunc in, pretium sapien.</p><p>Cras nec velit sed orci venenatis luctus in vitae nibh. Integer gravida consectetur rutrum. Integer eu libero euismod elit fringilla placerat et tincidunt eros. Sed ipsum mauris, consectetur commodo aliquet at, consectetur id turpis. Sed nec dolor tellus. Etiam elit enim, dictum quis semper quis, auctor ac arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p><p>Donec in neque ante. Duis viverra velit malesuada risus scelerisque rutrum at sit amet nulla. Ut vitae dui eu augue rutrum tincidunt. Pellentesque ac vestibulum orci. Aenean eget elit ut turpis imperdiet dignissim. Nullam efficitur neque in lorem condimentum, sed mattis libero vestibulum. Proin id leo vitae nisi porttitor dignissim eu sed dolor. Sed et mi tellus. Mauris rhoncus neque risus, vel sodales neque ultrices ac. Suspendisse ultricies elit lacus, at blandit diam volutpat ac. Pellentesque faucibus elit sed dolor maximus, a lacinia neque pharetra. Quisque quis ligula in nunc ullamcorper vehicula.</p><p>Aliquam malesuada justo vitae elementum tincidunt. Vivamus non sollicitudin nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ultrices maximus enim, aliquam lobortis magna accumsan a. Phasellus et ex accumsan, elementum eros sed, hendrerit diam. Mauris et eros porta diam pretium vestibulum eu vel odio. Aenean a leo arcu. Donec vestibulum nulla at risus elementum placerat. Pellentesque laoreet urna et metus pellentesque interdum.</p>'
</script>

<template>
  <div class="rounded-lg bg-white p-10 shadow-xl">
    <div class="mb-10 space-y-1 text-center">
      <h1 class="text-4xl font-bold">Petunjuk Mengerjakan Psikotes</h1>
      <p class="text-2xl">Alat Tes 1</p>
      <p class="">Kelompok Tes 6</p>
    </div>
    <div class="psi-editor mx-auto max-w-4xl" v-html="dummyPetunjuk"></div>
    <div class="mt-10 flex justify-center">
      <psi-button>Kerjakan Psikotes</psi-button>
    </div>
  </div>
</template>
