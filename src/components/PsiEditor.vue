<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { computed, watch, ref } from 'vue'
import BlockQuote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import History from '@tiptap/extension-history'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import TableCell from '@tiptap/extension-table-cell'
import BoldIcon from './editor/textmod/BoldIcon.vue'
import ItalicIcon from './editor/textmod/ItalicIcon.vue'
import StrikeIcon from './editor/textmod/StrikeIcon.vue'
import UnderlineIcon from './editor/textmod/UnderlineIcon.vue'
import BlockquoteIcon from './editor/textmod/BlockquoteIcon.vue'
import H1Icon from './editor/heading/H1Icon.vue'
import H2Icon from './editor/heading/H2Icon.vue'
import H3Icon from './editor/heading/H3Icon.vue'
import LeftAlignIcon from './editor/textalign/LeftAlignIcon.vue'
import CenterAlignIcon from './editor/textalign/CenterAlignIcon.vue'
import RightAlignIcon from './editor/textalign/RightAlignIcon.vue'
import JustifyAlignIcon from './editor/textalign/JustifyAlignIcon.vue'
import OrderedListIcon from './editor/list/OrderedListIcon.vue'
import UnorderedListIcon from './editor/list/UnorderedListIcon.vue'
import ImageIcon from './editor/ImageIcon.vue'
import TableIcon from './editor/TableIcon.vue'
import config from '../config'
import ModalImage from './ModalImage.vue'

const PsiImageExtension = Image.extend({
  name: 'psi-image',
  addAttributes() {
    return {
      ...Image.config.addAttributes(),
      size: {
        default: '100%',
        parseHTML: (element) => {
          return element.getAttribute('data-size')
        },
        // … and customize the HTML rendering.
        renderHTML: (attributes) => {
          return {
            'data-size': attributes.size,
            style: `width: ${attributes.size}`
          }
        }
      }
    }
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          })
        },
      setSize:
        (options) =>
        ({ tr, commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              ...tr.selection.node.attrs,
              ...options
            }
          })
        }
    }
  }
})
const PsiTableCellExtension = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      borderWidth: {
        default: null,
        parseHTML: (element) => {
          return {
            borderWidth: element.getAttribute('data-border-width')
          }
        },
        renderHTML: (attributes) => {
          return {
            'data-border-width': attributes.borderWidth,
            style: `border-width: ${attributes.borderWidth}`
          }
        }
      }
    }
  }
})

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  },
  errorMessage: {
    type: Array
  }
})
const emit = defineEmits(['update:modelValue'])
const showImageModal = ref(false)
const editorValue = computed(() =>
  props.modelValue.replace(/==cdn_url==/g, config.cdnUrl)
)
const editor = useEditor({
  content: editorValue.value,
  editorProps: {
    attributes: {
      class: 'psi-editor psi-editor-input'
    }
  },
  extensions: [
    Document,
    Paragraph,
    Text,
    BlockQuote,
    BulletList,
    OrderedList,
    ListItem,
    HardBreak,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Dropcursor,
    Gapcursor,
    History,
    PsiImageExtension,
    Table.configure({
      resizable: true
    }),
    TableRow,
    PsiTableCellExtension,
    TableHeader,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    })
  ],
  onUpdate: ({ editor }) => {
    const modified_value = editor
      .getHTML()
      .replace(new RegExp(config.cdnUrl, 'g'), '==cdn_url==')
    emit('update:modelValue', modified_value)
  }
})
const openImageModal = () => {
  showImageModal.value = true
}
const closeImageModal = () => {
  showImageModal.value = false
}
const handleImageSelected = (image) => {
  editor.value
    .chain()
    .setImage({ src: `==cdn_url==${image}` })
    .run()
  closeImageModal()
}
watch(editorValue, () => {
  if (editor.value && editorValue.value !== editor.value.getHTML()) {
    editor.value.commands.setContent(editorValue.value, true)
  }
})
</script>

<template>
  <div v-if="editor">
    <p class="ml-1 mb-1 text-gray-600">
      {{ props.label }}
    </p>
    <div class="relative w-full rounded border border-gray-400">
      <div class="sticky top-0 z-10 rounded-t bg-white px-5 py-2 shadow-md">
        <div class="flex space-x-3 overflow-x-auto">
          <!-- bold -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('bold')
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleBold().run()"
          >
            <bold-icon class="h-4 w-4" />
          </button>
          <!-- italic -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('italic')
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            <italic-icon class="h-4 w-4" />
          </button>
          <!-- strike -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('strike')
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleStrike().run()"
          >
            <strike-icon class="h-4 w-4" />
          </button>
          <!-- underline -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('underline')
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleUnderline().run()"
          >
            <underline-icon class="h-4 w-4" />
          </button>
          <!-- blockquote -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('blockquote')
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleBlockquote().run()"
          >
            <blockquote-icon class="h-4 w-4" />
          </button>
          <div class="border border-gray-300"></div>

          <!-- h1 -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('heading', { level: 1 })
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <h-1-icon class="h-4 w-4" />
          </button>
          <!-- h2 -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('heading', { level: 2 })
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <h-2-icon class="h-4 w-4" />
          </button>
          <!-- h3 -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('heading', { level: 3 })
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <h-3-icon class="h-4 w-4" />
          </button>
          <div class="border border-gray-300"></div>

          <!-- left -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive({ textAlign: 'left' })
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().setTextAlign('left').run()"
          >
            <left-align-icon class="h-4 w-4" />
          </button>
          <!-- center -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive({ textAlign: 'center' })
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().setTextAlign('center').run()"
          >
            <center-align-icon class="h-4 w-4" />
          </button>
          <!-- right -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive({ textAlign: 'right' })
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().setTextAlign('right').run()"
          >
            <right-align-icon class="h-4 w-4" />
          </button>
          <!-- justify -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive({ textAlign: 'justify' })
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().setTextAlign('justify').run()"
          >
            <justify-align-icon class="h-4 w-4" />
          </button>
          <div class="border border-gray-300"></div>

          <!-- ol -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('orderedList')
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >
            <ordered-list-icon class="h-4 w-4" />
          </button>
          <!-- ul -->
          <button
            class="flex-none rounded p-2 transition-colors"
            :class="[
              editor.isActive('bulletList')
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-300'
                : 'bg-gray-200 hover:bg-gray-300'
            ]"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            <unordered-list-icon class="h-4 w-4" />
          </button>
          <div class="border border-gray-300"></div>

          <!-- image -->
          <button
            class="flex-none rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
            @click="openImageModal"
          >
            <image-icon class="h-4 w-4" />
          </button>
          <div class="border border-gray-300"></div>

          <!-- table -->
          <button
            class="flex-none rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
          >
            <table-icon
              class="h-4 w-4"
              @click="
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
                  .run()
              "
            />
          </button>
        </div>
        <!-- table option menu -->
        <div
          v-show="editor.isActive('table')"
          class="mt-3 flex space-x-3 overflow-x-auto pb-2"
        >
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().toggleHeaderCell().run()"
          >
            ubah header
          </button>
          <div class="border border-gray-300"></div>

          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().addRowAfter().run()"
          >
            tambah baris
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().addColumnAfter().run()"
          >
            tambah kolom
          </button>
          <div class="border border-gray-300"></div>

          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().mergeCells().run()"
          >
            gabung sel
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().splitCell().run()"
          >
            pisah sel
          </button>
          <div class="border border-gray-300"></div>

          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="
              editor
                .chain()
                .focus()
                .setCellAttribute('borderWidth', '1px')
                .run()
            "
          >
            tambah border sel
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="
              editor.chain().focus().setCellAttribute('borderWidth', '0').run()
            "
          >
            hapus border sel
          </button>
          <div class="border border-gray-300"></div>

          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().deleteRow().run()"
          >
            hapus baris
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().deleteColumn().run()"
          >
            hapus kolom
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().deleteTable().run()"
          >
            hapus tabel
          </button>
        </div>
        <div
          v-show="editor.isActive('psi-image')"
          class="mt-3 flex space-x-3 overflow-x-auto pb-2"
        >
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().setSize({ size: '25%' }).run()"
          >
            Kecil
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().setSize({ size: '50%' }).run()"
          >
            Sedang
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().setSize({ size: '75%' }).run()"
          >
            Besar
          </button>
          <button
            class="flex-none rounded bg-gray-200 px-2 py-1 text-sm transition-colors hover:bg-gray-300"
            @click="editor.chain().focus().setSize({ size: '100%' }).run()"
          >
            Penuh
          </button>
          <!-- <div class="border border-gray-300"></div> -->
        </div>
      </div>
      <editor-content :editor="editor" />
    </div>
    <modal-image
      :show-modal="showImageModal"
      @close-modal="closeImageModal"
      @image-selected="handleImageSelected"
    />
  </div>
</template>
