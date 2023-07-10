/**
 * Retorna a data atual formatada
 * @param {String} format Parâmetro obrigatório, formato de retorno da data
 * @return {String} Retorna a data atual formatada
 * @author Sérgio Machado
 */
function dataCorrente(format) {
	try {
		var locale = java.util.Locale("pt", "BR");
		var hoje = java.util.Calendar.getInstance();
		var dt = (java.text.SimpleDateFormat(format, locale)).format(hoje.getTime());
		return dt;
	} catch (err) {
		throw "function " + arguments.callee.name + " => " + err.toString();
	}
}