import md5 from 'crypto-js/md5'
function randomUsername(prefix, randomLength) {
  // 兼容更低版本的默认值写法
  prefix === undefined ? (prefix = '') : prefix
  randomLength === undefined ? (randomLength = 8) : randomLength

  // 设置随机用户名
  // 用户名随机词典数组
  const nameArr = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'g',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ],
  ]
  // 随机名字字符串
  let name = prefix
  // 循环遍历从用户词典中随机抽出一个
  for (let i = 0; i < randomLength; i++) {
    // 随机生成index
    const index = Math.floor(Math.random() * 2)
    let zm = nameArr[index][Math.floor(Math.random() * nameArr[index].length)]
    // 如果随机出的是英文字母
    if (index === 1) {
      // 则百分之50的概率变为大写
      if (Math.floor(Math.random() * 2) === 1) {
        zm = String(zm).toUpperCase()
      }
    }
    // 拼接进名字变量中
    name += zm
  }
  // 将随机生成的名字返回
  return name
}
export const login = async ({ username, password }) => {
  const userStore = useUserStore()

  const res = await $request('/prod-api/auth/login/hone', {
    body: {
      username: username,
      password: password,
      code: '***---+++',
      uuid: 'cabc1ec3d3da42d9970888edcdc343d7',
      sign: md5(`${username},.!${password}`).toString(),
    },
    method: 'POST',
  })
  userStore.login(res.data)
}
export const register = async ({ username, password, pCode, phoneCode }) => {
  await $request('/prod-api/home/user', {
    body: {
      userName: username,
      nickName: randomUsername('用户', 10),
      pCode: pCode,
      password: password,
      phoneCode: phoneCode,
    },
    method: 'POST',
    showLoading: true,
  })
}
export const forgetPwd = async ({ username, password, phoneCode }) => {
  await $request('/prod-api/home/user/wjpassword', {
    body: {
      phone: username,
      newPassword: password,
      phoneCode: phoneCode,
    },
    method: 'POST',
  })
}
export const getInfo = async () => {
  const res = await $request('/prod-api/home/user/getInfo', {})
  return res.data
}
export const sendLoginCode = async (phone) => {
  const sign = md5(`${phone},.!`).toString()
  await $request.get(`/prod-api/home/user/code/${phone}/${sign}`)
}
export const sendForgetPwdCode = async (phone) => {
  const sign = md5(`${phone},.!`).toString()
  await $request.get(`/prod-api/home/user/codewjmm/${phone}/${sign}`)
}
