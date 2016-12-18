var add_ins = '<tr> <td>\
                                <div class="ui compact selection dropdown">\
                                    <input name="opt" type="hidden">\
                                    <i class="dropdown icon"></i>\
                                    <div class="default text"> instructions </div>\
                                    <div class="menu">\
                                        <div class="item" data-value="LD">ld</div>\
                                        <div class="item" data-value="SW">sw</div>\
                                        <div class="item" data-value="ADD">add</div>\
                                        <div class="item" data-value="NAND">nand</div>\
                                    </div>\
                                </div>\
                                <div class="ui compact selection dropdown">\
                                    <input name="regA" type="hidden">\
                                    <i class="dropdown icon"></i>\
                                    <div class="default text"> regA </div>\
                                    <div class="menu">\
                                        <div class="item" data-value="0">0</div>\
                                        <div class="item" data-value="1">1</div>\
                                        <div class="item" data-value="2">2</div>\
                                        <div class="item" data-value="3">3</div>\
                                        <div class="item" data-value="4">4</div>\
                                        <div class="item" data-value="5">5</div>\
                                        <div class="item" data-value="6">6</div>\
                                        <div class="item" data-value="7">7</div>\
                                    </div>\
                                </div>\
                                <div class="ui compact selection dropdown">\
                                    <input name="regB" type="hidden">\
                                    <i class="dropdown icon"></i>\
                                    <div class="default text"> regB </div>\
                                    <div class="menu">\
                                        <div class="item" data-value="1">1</div>\
                                        <div class="item" data-value="2">2</div>\
                                        <div class="item" data-value="3">3</div>\
                                        <div class="item" data-value="4">4</div>\
                                        <div class="item" data-value="5">5</div>\
                                        <div class="item" data-value="6">6</div>\
                                        <div class="item" data-value="7">7</div>\
                                    </div>\
                                </div>\
                                <div class="ui compact selection dropdown">\
                                    <input name="destReg" type="hidden">\
                                    <i class="dropdown icon"></i>\
                                    <div class="default text"> destReg </div>\
                                    <div class="menu">\
                                        <div class="item" data-value="1">1</div>\
                                        <div class="item" data-value="2">2</div>\
                                        <div class="item" data-value="3">3</div>\
                                        <div class="item" data-value="4">4</div>\
                                        <div class="item" data-value="5">5</div>\
                                        <div class="item" data-value="6">6</div>\
                                        <div class="item" data-value="7">7</div>\
                                    </div>\
                                </div>\
                                OFFSET\
                            </td> <td> C10 </td> <td> C8 </td> <td> C9 </td> <td> C12 </td> <td>\
                            	<button class="negative ui compact button my-del">Delete</button>\
                            </td> </tr>';

$(document).ready(function() {
	$('#instruction').append(add_ins); $('.ui.dropdown').dropdown();
	$('#new-ins').click(function() {$('#instruction').append(add_ins); $('.ui.dropdown').dropdown(); $('.my-del').click(function() {$(this).parent().parent().remove();});});
	$('.my-del').click(function() {$(this).parent().parent().remove();});
	$('#next').click(function() {
		$('#new-ins').remove();
	});
});
