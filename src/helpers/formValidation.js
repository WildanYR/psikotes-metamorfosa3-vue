export default class FormValidator {
  constructor(value) {
    this.value = value
    this.errorMessage = []
    this.invalid = false
  }

  isRequired() {
    if (!this.value) {
      this.errorMessage.push('harus diisi')
      this.invalid = true
    }
    if (Array.isArray(this.value) && !this.value.length) {
      this.errorMessage.push('harus diisi')
      this.invalid = true
    }
    return this
  }

  isEmail() {
    if (!this.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      this.errorMessage.push('tidak valid')
      this.invalid = true
    }
    return this
  }

  min(min) {
    if (this.value.length < min) {
      this.errorMessage.push(`kurang dari ${min}`)
      this.invalid = true
    }
    return this
  }
}
