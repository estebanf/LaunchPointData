'use strict';

module.exports=function(launchpointcase) {
  launchpointcase.getProcesses = function(environmentid,clientid,caseid,cb){
    var app = launchpointcase.app;
    var casetracking = app.models.casetracking;
    var iqtracking = app.models.iqtracking;
    var isotracking = app.models.isotracking;
    var executionerror = app.models.executionerror;
    var results ={}
    var query= {
      where:{
        and:[
          {environmentid:environmentid},
          {clientid:clientid},
          {caseid:caseid}
        ]
      }
    }
    var queryct = query;
    queryct.where.and.push({haschanges: true})

    var queryex = query;
    queryex.where.and.push({resolved:false})

    casetracking.find(queryct,function(err,ct){
      results.casetrackings = ct;
      iqtracking.find(query,function(err,iqt){
        results.iqtrackings = iqt;
        isotracking.find(query,function(err,isot){
          results.isotrackings = isot;

          executionerror.find(queryex,function(err,exerr){
            results.executionerrors = exerr
            cb(null,results)
          })
        })
      })
    })
  }
  launchpointcase.getCase = function(environmentid,clientid,caseid,cb){
    var query= {
      where:{
        and:[
          {environmentid:environmentid},
          {clientid:clientid},
          {caseid:caseid}
        ]
      }
    }

    launchpointcase.find(query,function(err,lp){
      if(lp && lp.length > 0){
        cb(null,lp[0])
      }
      else{
        cb(null,{})
      }
    });
  }

  launchpointcase.remoteMethod('getCase',{
    accepts:[
      { arg : 'environmentid', type:'integer'},{arg:'clientid',type:'integer'},{arg:'caseid',type:'integer'}],
    http: { path:'/getcase/:environmentid/:clientid/:caseid', verb: 'get'},
    returns: {arg: 'launchpointcase',type :'Object'}
  })
  launchpointcase.remoteMethod('getProcesses',{
    accepts:[
      { arg : 'environmentid', type:'integer'},{arg:'clientid',type:'integer'},{arg:'caseid',type:'integer'}],
    http: { path:'/getprocesses/:environmentid/:clientid/:caseid', verb: 'get'},
    returns: {arg: 'results',type :'Object'}
  })

};
