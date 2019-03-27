import qs from 'qs'
import merge from 'lodash/merge'

export default function(params, requestType = 'post', openDefaultParam = false, contentType = 'json') {
	// 默认参数
	var defaults = {
		't': new Date().getTime()
	}

	params = openDefaultParam ? merge(defaults, params) : params;
	params = requestType === 'post' ? (contentType === 'json' ? JSON.stringify(params) : qs.stringify(params)) : params;
	return params
}