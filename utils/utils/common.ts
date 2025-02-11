export const toOptionsList = (list, { labelKey = 'label', valueKey = 'value' } = {}) => {
  const optionsList: any[] = []
  const repeatList: any[] = []
  function getRepeatIndex(label) {
    for (let i = 0; i < optionsList.length; i++) {
      const orginLabel = optionsList[i].origin[labelKey]
      if (orginLabel === label) {
        return i
      }
    }
    return -1
  }
  list.map((item, index) => {
    const label = item[labelKey]
    const value = item[valueKey]
    const repeatIndex = getRepeatIndex(label)
    const isLabelRepeat = repeatIndex > -1
    // 重复了
    if (isLabelRepeat) {
      repeatList.push(repeatIndex)
      repeatList.push(index)
    }
    optionsList.push({
      label,
      value,
      origin: item,
      isLabelRepeat,
    })
  })
  const warnMessage: any[] = []
  Array.from(new Set(repeatList)).map((indexInOptionsList) => {
    const label = optionsList[indexInOptionsList].origin[labelKey]
    const value = optionsList[indexInOptionsList].origin[valueKey]
    warnMessage.push(`repeat index ${indexInOptionsList},${label},${value}`)
    optionsList[indexInOptionsList].label = `${label} ${value}`
  })
  if (warnMessage.length) {
    console.warn(warnMessage)
  }
  return optionsList
}
export const getTypeName = (v, map: Record<string, any>[], { label = 'label', value = 'value' } = {}) => {
  let name = ''
  try {
    const type = map.find((item) => String(item[value]) === String(v))
    if (type) {
      name = type[label]
    }
  } catch (e) {
    console.error(e)
  }
  return name
}
