from django.shortcuts import render,HttpResponse
from APP01.models import *
# Create your views here.
from django.views import View
from CURD.set import table_config           #导入配置文件
import json
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.utils.decorators import method_decorator   #CBV模式下的局部csrf
from django.http.request import QueryDict   #反序列化
from utiles.pager import Pagination    #分页组件
from django.utils.safestring import mark_safe
class QueryDictJson():

    def request_body_serialze(self,request):
        '''处理数据进行反序列化的函数
        #quertdict转成普通字典
        对request.body做QuertDict编码转换处理
        # 如果不做数据处理：格式b'id=49&name=%E4%B8%AD&name_cn=&comment='
        # 页面中提交的中文“中”，变成%E4%B8%AD'''
        querydict = QueryDict(request.body.decode("utf-8"), encoding="utf-8")
        response_dict = {}
        try:
            for key, val in querydict.items():
                response_dict[key] = val
        except:
            pass
        return response_dict

class AssetView(View):

    def get(self,request,*args,**kwargs):
        '''拿页面'''
        return render(request,"asset.html")
table_list=""
@ method_decorator(csrf_exempt, name="dispatch")    #CBV模式下局部去掉csrf验证
class AssetJsonView(View,QueryDictJson):
    # quertdict转成普通字典
    def get(self,request,*args,**kwargs):

        need_data={}

        '''ajax GET请求拿数据'''
        #################查找之后分页用的################################3
        global table_list
        check_data = {}
        if request.GET:
            check_data = request.GET.dict()
        try:
            current_page = int(check_data.get("pager"))
            del check_data["pager"]
        except Exception as e:
            current_page = 1
        print("table_list",table_list)
        print("check_data",check_data)
        if table_list and not check_data:
            print("查找")
            L = len(table_list)
            print(L)
            page_obj = Pagination(L, current_page, "")
            data_list = table_list[int(page_obj.Start()):int(page_obj.End())]
            page_obj = page_obj.page_str()
            page_obj = mark_safe(page_obj)
        #################查找之后分页用的################################3

        else:
            #################正常分页################################3
            if request.GET:
                need_data=request.GET.dict()
                print("data",need_data)
            ret = {
                "status": True,
                "message": "查找成功",
            }
            field_list=[]
            for i in table_config:
                if i["field"]==None or i["field"]=="firstcol":
                    continue
                field_list.append(i["field"])
            #分页组件获取数据
            try:
                current_page = int(need_data.get("pager"))
                del need_data["pager"]
            except Exception as e:
                current_page = 1
            table_list=list(student.objects.all().values(*field_list))  #全部查询
            if need_data:                  #条件查找（这里太牛逼了，后端牛逼，前端更牛逼）
                print(list(request.GET))

                seek_list = {}
                try:
                    for k in need_data:
                        mid=request.GET.get(k,None)
                        if mid:
                            seek_list[k] = mid
                    table_list = list(student.objects.filter(**seek_list).values(*field_list))  # 条件查询
                except Exception:
                    ret["message"] = "输入格式有误"
                    ret["status"] = False
                    return HttpResponse(json.dumps(ret))

            # print(tuple(classes.objects.all().values_list("id","name")))
            L = len(table_list)
            print(L)

            page_obj = Pagination(L, current_page, "")
            data_list = table_list[int(page_obj.Start()):int(page_obj.End())]
            page_obj=page_obj.page_str()
            page_obj = mark_safe(page_obj)
            ################正常分页################################3
        result={
            "table_list":data_list,               #传递数据库数据
            "page_obj":page_obj,
            "table_config":table_config,           #传递配置
            "global_dict":{                        #向前端传递选择项
                "table_config": table_config,
                "gender_choices": student.gender_choices,  #字段选择项
                "cls_choices":tuple(classes.objects.all().values_list("id","name")) #前端跨表查询用
            },
            # 'pager':'<li><a >1</a></li><li><a >2</a></li><li><a >3</a></li><li><a >4</a></li><li><a>5</a></li>'
            #分页组件生成页码信息
        }
        result=json.dumps(result)

        return HttpResponse(result)
        # return HttpResponse({"result":json.dumps(result) , "page_obj": page_obj})


    def put(self,request,*args,**kwargs):
        '''put请求修改数据'''
        ret = {
            "status": False,
            "message": "修改成功",
        }
        data = self.request_body_serialze(request)
        data=data["PostList"]
        data_list = eval(data)
        try:
            for i in data_list:
                i=eval(i)
                if i.get("gender",False):
                    print(student.gender_choices)
                    for g in student.gender_choices:
                        if i["gender"]==g[1]:
                            i["gender"]=g[0]
                if i.get("cls_id",False):
                    print(list(classes.objects.all().values_list("id", "name")))
                    for cls in list(classes.objects.all().values_list("id", "name")):
                        if i["cls_id"]==cls[1]:
                            i["cls_id"]=cls[0]
                id=int(i["id"])
                del i["id"]
                student.objects.filter(id=id).update(**i)
        except Exception as e:
            ret["message"]="修改失败"
            ret["status"]=True
        return HttpResponse(json.dumps(ret))

    def delete(self,request,*args,**kwargs):
        '''delete批量删除'''
        ret = {
            "status": True,
            "message": "删除成功",
        }
        data = self.request_body_serialze(request)
        print(data)

        try:
            for i in eval(data["delNid"]):
                print(i)
                student.objects.filter(id=int(i)).delete()
        except Exception as e:
            ret["message"] = "删除失败"
            ret["status"] = False
        return HttpResponse(json.dumps(ret))

    def post(self,request,*args,**kwargs):
        '''post请求添加信息'''
        ret = {
            "status": True,
            "message": "添加成功",
        }
        add_list={}
        try:
            for k in list(request.POST):
                add_list[k]=request.POST.get(k)
                print(request.POST.get(k))
            student.objects.create(**add_list)
        except Exception:
            ret["message"] = "添加失败"
            ret["status"] = False
        return HttpResponse(json.dumps(ret))