class Paginator
{
  public pages;
  public pageSize: number;
  public currentPage: number;

  constructor(pages, pageSize: number)
  {
    this.pages = pages;
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  GetPage()
  {
    const startIndex = ( this.currentPage - 1 ) * this.pageSize;
    return this.pages.slice(startIndex, startIndex + this.pageSize);
  }

  Next()
  {
    if ( this.currentPage * this.pageSize < this.pages.length )
    {
      this.currentPage++;
    } else this.First();
    return this.GetPage();
  }

  Previous()
  {
    if ( this.currentPage > 1 )
    {
      this.currentPage--;
    } else this.Last();
    return this.GetPage();
  }

  First()
  {
    this.currentPage = 1;
    return this.GetPage();
  }

  Last()
  {
    this.currentPage = Math.ceil( this.pages.length / this.pageSize );
    return this.GetPage()
  }
}

export { Paginator };

