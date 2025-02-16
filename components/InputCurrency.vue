<template>
  <input
    v-if="!readOnly"
    ref="numeric"
    v-model="amount"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="allowClear ? 'number' : 'tel'"
    @blur="onBlurHandler"
    @input="onInputHandler"
    @focus="onFocusHandler"
    @change="onChangeHandler"
  />
  <span v-else ref="readOnly">{{ amount }}</span>
</template>

<script>
import { toCurrency, toNumber } from '@/utils/utils/format'

export default {
  props: {
    /**
     * Allow clear.
     */
    allowClear: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Currency symbol.
     */
    currency: {
      type: String,
      default: '',
      required: false,
    },

    /**
     * Maximum value allowed.
     */
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER || 9007199254740991,
      required: false,
    },

    /**
     * Minimum value allowed.
     */
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER || -9007199254740991,
      required: false,
    },

    /**
     * Enable/Disable minus value.
     */
    minus: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Input placeholder.
     */
    placeholder: {
      type: String,
      default: '',
      required: false,
    },

    /**
     * Value when the input is empty
     */
    emptyValue: {
      type: [Number, String],
      default: '',
      required: false,
    },

    /**
     * Number of decimals.
     * Decimals symbol are the opposite of separator symbol.
     */
    precision: {
      type: Number,
      default: 2,
      required: false,
    },

    /**
     * Thousand separator type.
     * Separator props accept either . or , (default).
     */
    separator: {
      type: String,
      default: ',',
      required: false,
    },

    /**
     * Forced thousand separator.
     * Accepts any string.
     */
    thousandSeparator: {
      default: undefined,
      required: false,
      type: String,
    },

    /**
     * Forced decimal separator.
     * Accepts any string.
     */
    decimalSeparator: {
      default: undefined,
      required: false,
      type: String,
    },

    /**
     * The output type used for v-model.
     * It can either be String or Number (default).
     */
    outputType: {
      required: false,
      type: String,
      default: 'Number',
    },

    /**
     * v-model value.
     */
    modelValue: {
      type: [Number, String],
      default: 0,
      required: true,
    },

    /**
     * Hide input and show value in text only.
     */
    readOnly: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Class for the span tag when readOnly props is true.
     */
    readOnlyClass: {
      type: String,
      default: '',
      required: false,
    },

    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     * Position of currency symbol
     * Symbol position props accept either 'suffix' or 'prefix' (default).
     */
    currencySymbolPosition: {
      type: String,
      default: 'prefix',
      required: false,
    },
  },
  emits: ['change', 'blur', 'focus', 'update:modelValue'],

  data: () => ({
    amount: '',
  }),

  computed: {
    /**
     * Number type of formatted value.
     * @return {Number}
     */
    amountNumber() {
      return this.unformat(this.amount)
    },

    /**
     * Number type of value props.
     * @return {Number}
     */
    valueNumber() {
      return this.unformat(this.modelValue)
    },

    /**
     * Define decimal separator based on separator props.
     * @return {String} '.' or ','
     */
    decimalSeparatorSymbol() {
      if (typeof this.decimalSeparator !== 'undefined') return this.decimalSeparator
      if (this.separator === ',') return '.'
      return ','
    },

    /**
     * Define thousand separator based on separator props.
     * @return {String} '.' or ','
     */
    thousandSeparatorSymbol() {
      if (typeof this.thousandSeparator !== 'undefined') return this.thousandSeparator
      if (this.separator === '.') return '.'
      if (this.separator === 'space') return ' '
      return ','
    },
  },

  watch: {
    /**
     * Watch for value change from other input with same v-model.
     * @param {Number} newValue
     */
    valueNumber(newValue) {
      if (this.$refs.numeric !== document.activeElement) {
        this.amount = this.format(newValue)
      }
    },

    /**
     * When readOnly is true, replace the span tag class.
     * @param {Boolean} newValue
     * @param {Boolean} oldValue
     */
    readOnly(newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        this.$nextTick(() => {
          this.$refs.readOnly.className = this.readOnlyClass
        })
      }
    },

    /**
     * Immediately reflect separator changes
     */
    separator() {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    },

    /**
     * Immediately reflect currency changes
     */
    currency() {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    },

    /**
     * Immediately reflect precision changes
     */
    precision() {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)
    },
  },

  mounted() {
    // Set default value props when valueNumber has some value
    if (this.valueNumber || this.isDeliberatelyZero()) {
      this.process(this.valueNumber)
      this.amount = this.format(this.valueNumber)

      // In case of delayed props value.
      setTimeout(() => {
        this.process(this.valueNumber)
        this.amount = this.format(this.valueNumber)
      }, 500)
    }

    // Set read-only span element's class
    if (this.readOnly) this.$refs.readOnly.className = this.readOnlyClass
  },

  methods: {
    /**
     * Handle change event.
     * @param {Object} e
     */
    onChangeHandler(e) {
      this.$emit('change', e)
    },
    /**
     * Handle blur event.
     * @param {Object} e
     */
    onBlurHandler(e) {
      this.$emit('blur', e)
      this.amount = this.format(this.valueNumber)
    },

    /**
     * Handle focus event.
     * @param {Object} e
     */
    onFocusHandler(e) {
      this.$emit('focus', e)
      if (typeof this.valueNumber === 'string' && this.valueNumber === '') {
        return ''
      } else {
        this.amount = toNumber(this.valueNumber).toFixed(this.precision)
      }
    },

    /**
     * Handle input event.
     */
    onInputHandler() {
      this.process(this.amountNumber)
    },

    /**
     * Validate value before update the component.
     * @param {Number} value
     */
    process(value) {
      if (typeof value === 'string' && value === '') this.$emit('update:modelValue', value)
      else {
        if (value >= this.max) this.update(this.max)
        if (value <= this.min) this.update(this.min)
        if (value > this.min && value < this.max) this.update(value)
        if (!this.minus && value < 0) this.min >= 0 ? this.update(this.min) : this.update(0)
      }
    },

    /**
     * Update parent component model value.
     * @param {Number} value
     */
    update(value) {
      const fixedValue = value.toFixed(this.precision)
      const output = this.outputType.toLowerCase() === 'string' ? fixedValue : Number(fixedValue)
      this.$emit('update:modelValue', output)
    },

    /**
     * Format value using symbol and separator.
     * @param {Number} value
     * @return {String}
     */
    format(value) {
      if (typeof value === 'string' && value === '') return ''
      return toCurrency(value, this.currency, 2, this.thousandSeparatorSymbol, this.decimal)
    },

    /**
     * Remove symbol and separator.
     * @param {Number} value
     * @return {Number}
     */
    unformat(value) {
      const toUnformat = typeof value === 'string' && value === '' ? this.emptyValue : value
      if (typeof toUnformat === 'string' && toUnformat === '') return ''
      return toNumber(toUnformat)
    },

    /**
     * Check if value was deliberately set to zero and not just evaluated
     * @return {boolean}
     */
    isDeliberatelyZero() {
      return this.valueNumber === 0 && this.modelValue !== ''
    },
  },
}
</script>
