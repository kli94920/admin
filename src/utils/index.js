import moment from 'moment'

export const formatDate = date =>
  date ? moment(date).format('YYYY-MM-DD') : ''

export const openFileDialog = (accept, callback, multiple = false) => {
  var input = document.createElement('input')
  input.type = 'file'
  input.accept = accept
  if (multiple) {
    input.multiple = multiple
  }
  if (typeof callback === 'function') {
    input.addEventListener('change', callback)
  }
  input.dispatchEvent(new MouseEvent('click'))
}
