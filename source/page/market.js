if (location.href.indexOf('try=confirm_send') > -1)
{
	if (user_data.proStyle && user_data.autoMarketFocus)
		$("input[type='submit']").focus();
}
else if (location.href.indexOf('&mode=') == -1 || location.href.indexOf('&mode=send') > -1)
{
	if (location.href.indexOf('try=confirm_send') == -1)
	{
		// Spice up market:
		// 120 x 106 pixels: er is een market1, 2 en 3.jpg: Hierdoor blijft de OK knop op dezelfde plaats staan
		if (user_data.proStyle && user_data.marketResizeImage)
			$("img[src*='big_buildings/market']").width(120).height(106);

		// New last village:
		$("input[type='submit']").bind("click", function ()
		{
			var village = getVillageFromCoords($("#inputx").val() + "|" + $("#inputy").val());
			if (village.isValid)
			{
				setCookie("lastVil", village.coord, 30);
			}
		});

		// Add last & doel
		var vilHome = getVillageFromCoords(game_data.village.coord);

		var targetLocation = $("#inputx").parent().parent().parent();
		var cookie = getCookie("lastVil");
		var coord = getVillageFromCoords(cookie);
		var htmlStr = '';
		if (coord.isValid)
		{
			var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, 'merchant');
			htmlStr = printCoord(coord, "&raquo; " + trans.sp.all.last + ": " + coord.x + "|" + coord.y);
			htmlStr += "&nbsp; <span id=lastVilTime>" + dist.html + "</span>";
		}

		// doelwit erbij zetten
		var doel = getVillageFromCoords(getCookie('doelwit'));
		if (doel.isValid)
		{
			var dist = getDistance(doel.x, vilHome.x, doel.y, vilHome.y, 'merchant');
			if (htmlStr.length > 0) htmlStr += "<br>";
			htmlStr += printCoord(doel, "&raquo; " + trans.sp.all.target + ": " + doel.x + "|" + doel.y) + " &nbsp;<span id=doelVilTime>" + dist.html + "</span>";
		}

		if (htmlStr.length > 0)
			targetLocation.append("<tr><td colspan=2>" + htmlStr + "</td></tr>");

		// Calculate total resources sent
		var table = $("table.vis:last");
		if (table.prev().text() == trans.tw.market.incomingTransports)
		{
			var sent = { stone: 0, wood: 0, iron: 0 };
			table.find("tr:gt(0)").each(function ()
			{
				var cell = $(this).find("td:eq(1)");
				var resources = $.trim(cell.text().replace(/\./g, "").replace(/\s+/g, " ")).split(" ");
				
				for (var i = 0; i < resources.length; i++) {
					if (resources[i]) {
						var restype = cell.find("span.icon:eq(" + i + ")");
						for (var resIndex = 0; resIndex < world_data.resources_en.length; resIndex++) {
							if (restype.hasClass(world_data.resources_en[resIndex])) {
								sent[world_data.resources_en[resIndex]] += parseInt(resources[i]);
							}
						}
					}
				}
			});

			table.append("<tr><th>" + trans.sp.all.total + ":</th><td colspan=3><img src=graphic/holz.png> " + formatNumber(sent.wood) + "&nbsp; <img src=graphic/lehm.png> " + formatNumber(sent.stone) + "&nbsp; <img src=graphic/eisen.png> " + formatNumber(sent.iron) + "</td></tr>");
		}
	}
}