var add_ins = '<tr> <td>\
                                <div class="ui compact selection dropdown">\
                                    <input name="opt" type="hidden">\
                                    <i class="dropdown icon"></i>\
                                    <div class="default text"> instructions </div>\
                                    <div class="menu">\
                                        <div class="item" data-value="LW">lw</div>\
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
                                        <div class="item" data-value="0">reg0</div>\
                                        <div class="item" data-value="1">reg1</div>\
                                        <div class="item" data-value="2">reg2</div>\
                                        <div class="item" data-value="3">reg3</div>\
                                        <div class="item" data-value="4">reg4</div>\
                                        <div class="item" data-value="5">reg5</div>\
                                        <div class="item" data-value="6">reg6</div>\
                                        <div class="item" data-value="7">reg7</div>\
                                    </div>\
                                </div>\
                                <div class="ui compact selection dropdown">\
                                    <input name="regB" type="hidden">\
                                    <i class="dropdown icon"></i>\
                                    <div class="default text"> regB </div>\
                                    <div class="menu">\
                                        <div class="item" data-value="1">reg1</div>\
                                        <div class="item" data-value="2">reg2</div>\
                                        <div class="item" data-value="3">reg3</div>\
                                        <div class="item" data-value="4">reg4</div>\
                                        <div class="item" data-value="5">reg5</div>\
                                        <div class="item" data-value="6">reg6</div>\
                                        <div class="item" data-value="7">reg7</div>\
                                    </div>\
                                </div>\
                                <div class="ui compact selection dropdown">\
                                    <input name="destReg" type="hidden">\
                                    <i class="dropdown icon"></i>\
                                    <div class="default text"> destReg </div>\
                                    <div class="menu">\
                                        <div class="item" data-value="">No Need</div>\
                                        <div class="item" data-value="1">reg1</div>\
                                        <div class="item" data-value="2">reg2</div>\
                                        <div class="item" data-value="3">reg3</div>\
                                        <div class="item" data-value="4">reg4</div>\
                                        <div class="item" data-value="5">reg5</div>\
                                        <div class="item" data-value="6">reg6</div>\
                                        <div class="item" data-value="7">reg7</div>\
                                    </div>\
                                </div>\
                                OFFSET\
                            </td> <td>  </td> <td>  </td> <td>  </td> <td>  </td> <td>\
                            	<button class="negative ui compact button my-del">Delete</button>\
                            </td> </tr>';

var tag = ['', '', '', '', '', '', '', ''];
var FU = [
{
    busy: false,
    op:"",
    R:"",
    R1:"",
    R2:"",
    T1:"",
    T2:""
},
{
    busy: false,
    op:"",
    R:"",
    R1:"",
    R2:"",
    T1:"",
    T2:""
},
{
    busy: false,
    op:"",
    R:"",
    R1:"",
    R2:"",
    T1:"",
    T2:""
},
{
    busy: false,
    op:"",
    R:"",
    R1:"",
    R2:"",
    T1:"",
    T2:""
}];

var circle = 1;
var opt = [];
var rA = [];
var rB = [];
var rD = [];

var first = true;
var length;

var ins_sta = [];
var ins_pos = [];

function check() {
    length = $("input[name='opt']").length;
    if (length == 0)
        return false;

    opt = [];
    rA = [];
    rB = [];
    rD = [];
    ins_sta = [];
    ins_pos = [];

    for (var i = 0; i < length; ++ i) {

        var str = $("input[name='opt']")[i].value;
        var regA = $("input[name='regA']")[i].value;
        var regB = $("input[name='regB']")[i].value;
        var destReg = $("input[name='destReg']")[i].value;

        opt.push(str);
        rA.push(regA);
        rB.push(regB);
        rD.push(destReg);
        ins_sta.push(0);
        ins_pos.push(-1);

        if (str == 'LW' || str == 'SW') {
            if (destReg != '' || regA == '' || regB == '')
                return false;
        } else {
            if (destReg == '' || regA == '' || regB == '')
                return false;
        }
    }
    return true;
}

function refresh_data() {
    for (var i = 0; i < 4; ++ i) {
        $('#fu-status tr .busy:eq(' + i + ')').html(FU[i].busy?('yes'):('no'));
        $('#fu-status tr .op:eq(' + i + ')').html(FU[i].op);
        $('#fu-status tr .dest:eq(' + i + ')').html(FU[i].R);
        $('#fu-status tr .reg1:eq(' + i + ')').html(FU[i].R1);
        $('#fu-status tr .reg2:eq(' + i + ')').html(FU[i].R2);
        $('#fu-status tr .tag1:eq(' + i + ')').html(FU[i].T1);
        $('#fu-status tr .tag2:eq(' + i + ')').html(FU[i].T2);
    }
    for (var i = 0; i < 8; ++ i) {
        $('#reg-status tr:eq(' + i + ') td:eq(1)').html(tag[i]);
    }
}

function Try_D() {
    for (var i = 0; i < ins_sta.length; ++ i) {
        if (ins_sta[i] == 0) {

            if (opt[i] == "SW")
                if (FU[3].busy)
                    return;
            if (opt[i] == "LW")
                if (tag[rB[i]] != "" || FU[2].busy)
                    return;
            if (opt[i] == "ADD" || opt[i] == "NAND")
                if (tag[rD[i]] || (FU[0].busy && FU[1].busy))
                    return;

            $("#instruction tr:eq(" + i + ") td:eq(1)").html('C' + circle);

            if (opt[i] == "SW") {
                FU[3].busy = true;
                FU[3].op = "SW";
                FU[3].R1 = rA[i];
                FU[3].R2 = rB[i];
                FU[3].T1 = tag[FU[i].R1];
                FU[3].T2 = tag[FU[i].R2];
                ins_pos[i] = 3;
            }

            if (opt[i] == "LW") {
                FU[2].busy = true;
                FU[2].op = "LW";
                FU[2].R1 = rA[i];
                FU[2].R2 = rB[i];
                FU[2].T1 = tag[FU[i].R1];
                FU[2].T2 = tag[FU[i].R2];
                tag[rB[i]] = "LW";
                ins_pos[i] = 3;
            }

            if (opt[i] == "ADD" || opt[i] == "NAND") {
                var p = 0;
                if (FU[0].busy)
                    p = 1;
                FU[p].busy = true;
                FU[p].op = opt[i];
                FU[p].R1 = rA[i];
                FU[p].R2 = rB[i];
                FU[p].R = rD[i];
                FU[p].T1 = tag[FU[i].R1];
                FU[p].T2 = tag[FU[i].R2];
                tag[rD[i]] = opt[i];
                ins_pos[i] = p;
            }

            ins_sta[i] ++;
            return;
        }
    }
}

function Try_S() {
    for (var i = 0; i < ins_sta.length; ++ i) {
        if (ins_sta[i] == 1) {

            if (opt[i] == "LW") {
                if (FU[ins_pos[i]].T1)
                    continue;
            } else {
                if (FU[ins_pos[i]].T1 || FU[ins_pos[i]].T2)
                    continue;
            }

            $("#instruction tr:eq(" + i + ") td:eq(2)").html('C' + circle);

            ins_sta[i] ++;
        }
    }
}

function Try_X() {
    for (var i = 0; i < ins_sta.length; ++ i) {
        if (ins_sta[i] == 2) {

            $("#instruction tr:eq(" + i + ") td:eq(3)").html('C' + circle);

            ins_sta[i] ++;
        }
    }
}

function Calculate() {
    //Try_W();
    Try_X();
    Try_S();
    Try_D();
    ++circle;
    refresh_data();
}

$(document).ready(function() {
	$('#instruction').append(add_ins); $('.ui.dropdown').dropdown();
	$('#new-ins').click(function() {$('#instruction').append(add_ins); $('.ui.dropdown').dropdown(); $('.my-del').click(function() {$(this).parent().parent().remove();});});
	$('.my-del').click(function() {$(this).parent().parent().remove();});
	$('#next').click(function() {
        if (first) {
            if (check() == false) {
                swal({
                    title:"Instruction Error",
                    html:true,
                    confirmButtonColor: "#057748",
                    confirmButtonText: "Try Again",
                    closeOnConfirm: true,
                    animation: "slide-from-top"
                });
                return;
            }
            first = false;
            $('#new-ins').remove();
            $('.ui.dropdown').addClass('disabled');
            $(".my-del").remove();
        }
        if (first == false)
            Calculate();
	});
});
