/*
This is a script to remove the date backup folder in backup.
*/
function removefolder() {
  var d = new Date();
  //Logger.log(d.getFullYear().toString());
  var timeStamp = Math.floor(d.getTime()/1000);
  //Logger.log(timeStamp);
//  var yy=d.getFullYear().toString();
//  var mm=(d.getMonth()+1).toString();
//  var dd=d.getDate().toString();
//  var hh=d.getHours().toString();
//  var ii=d.getMinutes().toString();
//  var ss=d.getSeconds().toString();
//  var dateint=parseInt(yy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]));
  
  var rootfolder=DriveApp.getRootFolder();
  //Logger.log(rootfolder.getName());
  var rootName=rootfolder.getName().toString();
  var folders = DriveApp.getFoldersByName('backup');
  
  //Logger.log(rootName+'/backup');
  while (folders.hasNext()) {
    var folder = folders.next();
    if(folder.getName()=='backup')
    {
      //Logger.log(folder.getParents().next().getName());
      if(folder.getParents().next().getName()==rootName)
      {
        Logger.log(folder.getParents().next().getName().toString()+'/'+folder.getName());
        //var datefolder=folder.createFolder(datestring);
        var datebackfolders=folder.getFolders();
        while (datebackfolders.hasNext()) {
          var datebackfolder = datebackfolders.next();
          //var datebackfolderint=parseInt(datebackfolder.getName());
          //var s=datebackfolder.getName()+' 00:00:00';
          var dateParts = datebackfolder.getName().split('-');
          var datebackfolderDate=new Date(dateParts[0],Math.abs(dateParts[1])-1,dateParts[2]);
          var datebackfolderDatetimeStamp=Math.floor(datebackfolderDate.getTime()/1000);
          Logger.log(datebackfolderDate);
          if((timeStamp-datebackfolderDatetimeStamp)>(86400*30))
          {
            Logger.log(datebackfolder.getName());
            datebackfolder.setTrashed(true);
          }
        }
        break;
      }
    }
  }
  
}
