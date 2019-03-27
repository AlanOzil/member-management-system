export function login () {
    return {
        isOpen: true,
        url: '/sys/login',
        type: 'post',
        data: {
            'msg': 'success',
            'code': '0',
            'expire': 43200,
            'token': '573a5cb08506e7ee35a3445ab3aff3da'
        }
    }
}

export function captcha (uuid) {
    return {
        isOpen: false,
        url: '`/captcha.jpg?uuid=${uuid}`',
        type: 'get',
        data: '123'
    }
}