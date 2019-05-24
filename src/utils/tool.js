export default {

	format(v, rule) {
		//rule: 'yyyy-MM-dd hh:mm:ss'

					//替换年份
					var year = v.getFullYear();

					var yearReg = /(y+)/;

					if (yearReg.test(rule)) {

						var groupContent = RegExp.$1;

						rule = rule.replace(groupContent, year);

					}


					//月，日，时，分，秒
					var o = {
						'M': v.getMonth() + 1, //月
						'd': v.getDate(), //日
						'h': v.getHours(), //时
						'm': v.getMinutes(), //分
						's': v.getSeconds() //秒
					};

					//替换 月，日，时，分，秒
					for (var key in o) {
						var reg = new RegExp('(' + key + '+)');
						
						if (reg.test(rule)) {

							//获取匹配组内容
							var content = RegExp.$1;

							var value = o[key];
							
							rule = rule.replace(content, value >= 10 ? value : content.length >= 2 ? '0' + value : value);

						}
					}

					return rule;
	}

}