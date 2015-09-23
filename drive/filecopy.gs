/*
This is a script to copy all of your files into the backup folder.
Just create a folder name backup. Then run it.
*/
function dofilecopy() {
  var d = new Date();
  //Logger.log(d.getFullYear().toString());
  //var timeStamp = d.getTime();
  //Logger.log(timeStamp);
  var yy=d.getFullYear().toString();
  var mm=(d.getMonth()+1).toString();
  var dd=d.getDate().toString();
  var hh=d.getHours().toString();
  var ii=d.getMinutes().toString();
  var ss=d.getSeconds().toString();
  var datestring=yy +'-'+ (mm[1]?mm:"0"+mm[0]) +'-'+ (dd[1]?dd:"0"+dd[0]);
  Logger.log(( yy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (ii[1]?ii:"0"+ii[0])  + (ss[1]?ss:"0"+ss[0]) ));
  var rootfolder=DriveApp.getRootFolder();
  //Logger.log(rootfolder.getName());
  var rootName=rootfolder.getName().toString();
  //Logger.log(rootName);

  var files = DriveApp.getFiles();
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
        var datefolder=folder.createFolder(datestring);
        break;
      }
    }
  }
  
  while (files.hasNext()) {
    var file = files.next();
    var filename=file.getName().toString();
    var filetype=file.getMimeType().toString();
    if(file.getParents().hasNext())
    {
      var parentfolder=file.getParents().next();//file.getParents().next();
      //Logger.log(file.getParents());
      var path='';
      while(parentfolder.getName()!=rootName)
      {
        path=(path=='')?parentfolder.getName():parentfolder.getName()+'_'+path;
        parentfolder=parentfolder.getParents().next();
      }
      //Logger.log(path);
      if((!(filename.indexOf('backup') > -1))&&(!(filetype.indexOf('script') > -1)))
      {
        file.makeCopy( 'backup_'+path+'_'+file.getName() ,datefolder );
        Logger.log(datestring+'_backup_'+path+'_'+file.getName());
      }
    }
    else //someone share the file
    {
      //Logger.log("else"+filename);
      file.makeCopy( 'backup_'+file.getName() ,datefolder );
    }
  
  }
  //Logger.log(folder.getName());
  
}
