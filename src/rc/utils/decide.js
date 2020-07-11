
/*
** 判断 校验的一些方法
*/ 

/*
** 该数据是否为中文
@	text 需要判断的字符
*/ 
export function isChinese(text) {
	const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
	return reg.test(text);
}