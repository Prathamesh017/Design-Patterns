Template Method is specifically about enforcing a fixed algorithm but letting certain steps vary.

So For Example , 
We have a exporter app which export reports in different formats — such as CSV, PDF, and Excel.

all 3 types , which have same functions and some format specfic function , In the naive approach we can duplicate the same code in all 3 it  should work the same

but as more and more formats are introducted , we have to duplicate lot of things. if we want to change a common approach/function ,  we have to make changes in all

SO Here Template Design Pattern Comes In , first we will define a abstract class with common and specific functions

```
abstract class AbstractReportExporter {
   public final exportReport(data: ReportData, filePath: string): void {
       this.prepareData(data);
       this.openFile(filePath);
       this.writeHeader(data);
       this.writeDataRows(data);
       this.writeFooter(data);
       this.closeFile(filePath);
       console.log("Export complete: " + filePath);
   }

   protected prepareData(data: ReportData): void { // Hook method
       console.log("Preparing report data (common step)...");
   }

   protected openFile(filePath: string): void { // Hook method
       console.log("Opening file '" + filePath);
   }

   protected abstract writeHeader(data: ReportData): void;

   protected abstract writeDataRows(data: ReportData): void;

   protected writeFooter(data: ReportData): void { // Hook method
       console.log("Writing footer (default: no footer).");
   }

   protected closeFile(filePath: string): void { // Hook method
       console.log("Closing file '" + filePath);
   }
}
```

so all the class can know extend  `AbstractReportExporter` and reuse the existing functions ,also can write thier own for `writeHeader` and `writeDataRows` as we have defined them abstract.

(no need for another example)
