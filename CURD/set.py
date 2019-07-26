table_config = [
    {
        "field": "firstcol",
        "title": "勾选栏",
        "display": True,
        "attrs": {}
    },
    {
        "field": "id",  # 要的数据库列数据
        "title": "ID",  # 表格表头
        "display": False,  # 是否显示
        # 操作内容选项比较固定，前端写
        "attrs": {}  # 前端添加td标签属性
        #"name":"id","edit-enable": "true", "edit-type": "input",
        #name是专门用来和数据库交互方便的
        #"edit-enable"是 能否编辑，"edit-type"是 编辑类型，暂有input框和下拉框
        #"edit-choices"是 下俩框选项，"name"是 对应数据库字段修改用的
    },
    {
        "field": "name",
        "title": "姓名",
        "display": True,
        "attrs": {"name":"name","edit-enable": "true", "edit-type": "input",}
    },
    {
        "field": "number",
        "title": "学号",
        "display": True,
        "attrs": {"name":"number","edit-enable": "true", "edit-type": "input",}
    },
    {
        "field": "age",
        "title": "年龄",
        "display": False,
        "attrs": {"name": "age", "edit-enable": "true", "edit-type": "input", }
    },
    {
        "field": "gender",
        "title": "性别",
        "display": True,
        "attrs": {"name":"gender","edit-enable": "true", "edit-type": "select","edit-choices":"gender_choices",}
        #attr第三个属性是对应字段选项信息
    },
    # {
    #     "field": "cls",  # 前端跨表
    #     "title": "班级",
    #     "display": True,
    #     "attrs": {"edit-enable": "true", "edit-type": "select"}
    # },
    {
        "field": "cls__name",  # 后端直接跨表，   后端跨表简单多
        "title": "班级",
        "display": True,
        "attrs": {"name":"cls_id","edit-enable": "true", "edit-type": "select","edit-choices":"cls_choices",}
    },
    {
        "field": None,
        "title": "操作",
        "display": True,
        "attrs": {}
    }
]