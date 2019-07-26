
"""
自定义分页
传入：
-所有数据的个数
-当前页
-Url
-每页显示5条
-最多页数选择7个
"""

class Pagination():
    def __init__(self, totalCount, currentPage, Url, perPagItemNum=5, maxPagNum=7,):
        # 数据总总条数，当前页，跳转的url，每页显示条数，最多显示页码
        self.Url=Url
        self.totalCount = totalCount
        try:
            v = int(currentPage)
            if v <= 0:
                v = 1
                self.currentPage = v
        except Exception as e:
            self.currentPage = 1
        self.perPagItemNum = perPagItemNum
        self.maxPagNum = maxPagNum
        self.currentPage = currentPage

    def Start(self):
        return (self.currentPage - 1) * self.perPagItemNum

    def End(self):
        return self.currentPage * self.perPagItemNum

    @property
    def TotalPage(self):  # 总页数
        result = divmod(self.totalCount, self.perPagItemNum)
        if result[1] == 0:
            return result[0]
        else:
            return result[0] + 1

    def page_num_range(self):
        # 当前页面
        # self.current_page
        # 总页数
        # self.num_pages
        # 最多显示的页码个数
        # self.max_pager_num
        if self.TotalPage < self.maxPagNum:
            return range(1, self.TotalPage + 1)
        part = int(self.maxPagNum / 2)
        if self.currentPage - part < 1:
            return range(1, self.maxPagNum + 1)
        if self.currentPage + part > self.TotalPage:
            return range(self.TotalPage + 1 - self.maxPagNum, self.TotalPage + 1)
        return range(self.currentPage - part, self.currentPage + part + 1)

    def page_str(self):
        page_list = []
        # first="<li><a href='"+self.Url+"?p=1'>首页</a></li>"
        # page_list.append(first)
        # if self.currentPage == 1:
        #     prev = "<li><a href='#'>上一页</a></li>"
        # else:
        #     prev = "<li><a href='"+self.Url+"?p=%s'>上一页</a></li>" % (self.currentPage - 1,)
        # page_list.append(prev)
        for i in self.page_num_range():
            if i==self.currentPage:
                # temp = "<li class= 'active'><a href='"+self.Url+"?p=%s'>%s</a></li>" % (i, i)
                temp = "<li class= 'active'><a>%s</a></li>" % (i,)
            else:
                # temp = "<li ><a href='"+self.Url+"?p=%s'>%s</a></li>" % (i, i)
                temp = "<li ><a>%s</a></li>" % (i, )
            page_list.append(temp)
        # if self.currentPage==self.TotalPage:
        #     nex = "<li><a href='#'>下一页</a></li>"
        # else:
        #     nex="<li><a href='"+self.Url+"?p=%s'>下一页</a></li>"%(self.currentPage+1,)
        # page_list.append(nex)
        # last = "<li><a href='"+self.Url+"?p=%s'>尾页</a></li>"%(self.TotalPage)
        # page_list.append(last)

        return ''.join(page_list)


