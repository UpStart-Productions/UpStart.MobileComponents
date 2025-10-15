declare module 'html-to-pdfmake' {
  interface ConvertOptions {
    window?: any;
    removeExtraBlanks?: boolean;
  }
  
  function htmlToPdfmake(html: string, options?: ConvertOptions): any[];
  export = htmlToPdfmake;
}

