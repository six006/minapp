// https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html

export namespace wx {
  type IWxAddCardObject = {
    /**
     * 需要添加的卡券列表，列表内对象说明请参见[请求对象说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#请求对象说明)
     */
    cardList: Array<{
      /**
       * 卡券 Id
       */
      cardId: string

      /**
       * 卡券的扩展参数
       *
       * **cardExt 说明：**
       *
       *   参数                   |  类型     |  必填 |是否参与签名|  说明                                                                                                                       
       * -------------------------|-----------|-------|-----------|-----------------------------------------------------------------------------------------------------------------------------
       *   code                   |  String   |  否   |  是       |用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写，[详情](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056)
       *   openid                 |  String   |  否   |  是       |  指定领取者的openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。         
       *   timestamp              |  Number   |  是   |  是       |  时间戳，东八区时间,UTC+8，单位为秒                                                                                         
       *   nonce_str              |  String   |  否   |  是       |随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。
       *   fixed_begintimestamp   |  Number   |  否   |  否       |卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。
       *   outer_str              |  String   |  否   |  否       |  领取渠道参数，用于标识本次领取的渠道值。                                                                                   
       *   signature              |  String   |  是   |  -        |签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见：[卡券签名](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
       *
       * **注：cardExt 需进行 JSON 序列化为字符串传入**
       */
      cardExt: string
    }>

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: {
      /**
       * 卡券添加结果列表，列表内对象说明请详见[返回对象说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#返回对象说明)
       */
      cardList: Array<{
        /**
         * 加密 code，为用户领取到卡券的code加密后的字符串，解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239)
         */
        code: string

        /**
         * 用户领取到卡券的Id
         */
        cardId: string

        /**
         * 用户领取到卡券的扩展参数，与调用时传入的参数相同
         */
        cardExt: string

        /**
         * 是否成功
         */
        isSuccess: boolean
      }>
    }) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * @since 1.1.0
   *
   * 批量添加卡券。
   *
   * **回调结果：**
   *
   *   回调类型  |  errMsg                          |  说明                                    
   * ------------|----------------------------------|------------------------------------------
   *   success   |  addCard:ok                      |  添加卡券成功                            
   *   fail      |  addCard:fail cancel             |  用户取消添加卡券                        
   *   fail      |  addCard:fail (detail message)   |添加卡券失败，其中 detail message 为后台返回的详细失败原因
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.addCard({
   *       cardList: [
   *         {
   *           cardId: '',
   *           cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
   *         }, {
   *           cardId: '',
   *           cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
   *         }
   *       ],
   *       success: function(res) {
   *         console.log(res.cardList) // 卡券添加结果
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#wxaddcardobject
   */
  function addCard(OBJECT: IWxAddCardObject): void
  type IWxOpenCardObject = {
    /**
     * 需要打开的卡券列表，列表内参数详见[openCard 请求对象说明](https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#opencard-请求对象说明)
     */
    cardList: Array<{
      /**
       * 需要打开的卡券 Id
       */
      cardId: string

      /**
       * 由 addCard 的返回对象中的加密 code 通过解密后得到，解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239)
       */
      code: string
    }>

    /**
     * 接口调用成功的回调函数
     */
    success?: (res: any) => any

    /**
     * 接口调用失败的回调函数
     */
    fail?: (err: any) => any

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => any
  }
  /**
   * @since 1.1.0
   *
   * 查看微信卡包中的卡券。
   *
   * **Tip：**
   *
   * 1.  `tip`: 目前只有认证小程序才能使用卡券接口，可参考[指引](https://mp.weixin.qq.com/debug/wxadoc/product/renzheng.html?t=201822)进行认证。
   * 2.  `tip`: 了解更多信息，请查看[微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)
   *
   * **示例代码：**
   *
   *     ```javascript
   *     wx.openCard({
   *       cardList: [
   *         {
   *           cardId: '',
   *           code: ''
   *         }, {
   *           cardId: '',
   *           code: ''
   *         }
   *       ],
   *       success: function(res) {
   *       }
   *     })
   *     ```
   * @see https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#wxopencardobject
   */
  function openCard(OBJECT: IWxOpenCardObject): void
}
