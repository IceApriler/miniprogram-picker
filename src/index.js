Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否需要填充默认选择结果
    autoSelect: {
      type: Boolean,
      value: false
    },
    // 源数据
    sourceData: {
      type: Array,
      value: [],
      observer: 'sourceDataChange'
    },
    // 阶数
    steps: {
      type: Number,
      value: 0
    },
    // 展示数据的字段名称
    shownFieldName: {
      type: String,
      value: 'name'
    },
    // 子节点名称，
    subsetFieldName: {
      type: String,
      value: 'subset'
    },
    // 其他需要返回的字段
    otherNeedFieldsName: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前所选择的索引数组
    multiIndex: {
      type: Array,
      value: [],
    },
    // 当前所展示的数组
    multiArray: {
      type: Array,
      value: [],
    },
    // 当前所选择的值数组
    selectedArray: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 监听源数据更新变化
     * @param {Array} newVal
     */
    sourceDataChange(newVal) {
      const { shownFieldName, subsetFieldName } = this.data
      // 源数据更新，则需要更新multiIndex、multiArray
      const multiIndex = []
      const multiArray = []

      // 无初始选择值，则默认选每列第0条
      const _multiArray = newVal.map((item) => {
        if (!item[shownFieldName]) {
          console.error(item, new Error(`源数据缺少"${shownFieldName}"`))
        }
        return item[shownFieldName]
      })

      const handle = (value = [], columnIndex = 0) => {
        // 当前遍历第 columnIndex 列
        value.forEach((item, index) => {
          if (item[shownFieldName] && index === 0) {
            // 选中的索引和值，默认取每列的第0个
            multiIndex.push(index)

            if (columnIndex < this.data.steps - 1) {
              if (item[subsetFieldName]) {
                const _arr = item[subsetFieldName].map(i => {
                  if (!i[shownFieldName]) {
                    console.error(item[subsetFieldName], new Error(`源数据缺少"${shownFieldName}"`))
                  }
                  return i[shownFieldName]
                })
                multiArray.push(_arr)
              } else {
                console.error(item, new Error(`源数据缺少"${subsetFieldName}"`))
              }

              handle(item[subsetFieldName], columnIndex + 1)
            }
          }
        })
      }

      multiArray.unshift(_multiArray)
      handle(newVal)

      this.setData({
        multiIndex,
        multiArray
      })
      console.log(this.data)
    },
    // 点击确定
    bindMultiPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)

      this.setData({
        multiIndex: e.detail.value
      })
      this.UpdateData()
    },
    // 更新数据
    UpdateData() {
      const { shownFieldName, subsetFieldName, otherNeedFieldsName } = this.data
      const selectedArray = []

      const handle = (value, columnIndex = 0) => {
        value.forEach((item, index) => {
          if (index === this.data.multiIndex[columnIndex]) {
            const selectedItem = {}
            selectedItem[shownFieldName] = item[shownFieldName]
            otherNeedFieldsName.forEach(key => {
              selectedItem[key] = item[key]
            })
            selectedArray.push(selectedItem)
            if (columnIndex < this.data.steps - 1) {
              handle(item[subsetFieldName], columnIndex + 1)
            }
          }
        })
      }
      handle(this.data.sourceData)

      this.setData({
        selectedArray
      })

      const detail = {
        multiIndex: this.data.multiIndex,
        selectedArray: this.data.selectedArray
      }
      this.triggerEvent('change', detail)
    },
    // 多级联动发生变化
    bindMultiPickerColumnChange(e) {
      console.log('修改的列为', e, e.detail.column, '，值为', e.detail.value)

      const { shownFieldName, subsetFieldName } = this.data
      // 第column列
      const column = e.detail.column
      // 第column列的第changeIndex个
      const changeIndex = e.detail.value

      const data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex,

        sourceData: this.data.sourceData
      }
      // multiIndex变化了，所以也要同步更新multiArray
      data.multiIndex[column] = changeIndex

      // 每次重置之后的index为0，但是有bug，待定
      // let _multiIndex = []
      // data.multiIndex.map((item, index) => {
      //   if (column >= index) {
      //     _multiIndex.push(item)
      //   }else {
      //     _multiIndex.push(0)
      //   }
      // })
      // data.multiIndex = _multiIndex

      /**
       * 假设 data.multiIndex的数据结构为 [1,2,2];  三阶 this.data.steps = 3
       */

      const handle = (value = [], columnIndex = 0) => {
        // 当前遍历第 columnIndex 列
        value.forEach((item, index) => {
          if (index === data.multiIndex[columnIndex]) {
            if (columnIndex < this.data.steps - 1) {
              if (!item[subsetFieldName]) {
                item[subsetFieldName] = []
              }
              const multiArrayItem = item[subsetFieldName].map((item2) => {
                if (!item2[shownFieldName]) {
                  console.error(item[subsetFieldName], new Error(`缺少"${shownFieldName}"`))
                }
                return item2[shownFieldName]
              })
              data.multiArray[columnIndex + 1] = multiArrayItem

              handle(item[subsetFieldName], columnIndex + 1)
            }
          }
        })
      }
      handle(data.sourceData)

      this.setData({
        multiArray: data.multiArray,
        multiIndex: data.multiIndex,
      })

      console.log(this.data.multiIndex)
      console.log(this.data)
    },
  },

  lifetimes: {
    attached() {
      if (this.data.autoSelect) {
        this.UpdateData()
      }
    }
  }
})
