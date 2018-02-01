'use strict';
module.exports=function(executionerror) {
  executionerror.getActiveTechnical = function(cb){
    executionerror.find({where:{and: [{technicalerror:true},{resolved:false}]}},function(err,results){
      cb(null,results)
    })
  }
  executionerror.getResolvedTechnical = function(cb){
    executionerror.find({where:{and: [{technicalerror:true},{resolved:true}]}},function(err,results){
      cb(null,results)
    })
  }
  executionerror.getActiveFunctional = function(cb){
    executionerror.find({where:{and: [{technicalerror:false},{resolved:false}]}},function(err,results){
      cb(null,results)
    })
  }
  executionerror.getResolvedFunctional = function(cb){
    executionerror.find({where:{and: [{technicalerror:false},{resolved:true}]}},function(err,results){
      cb(null,results)
    })
  }
  executionerror.remoteMethod('getActiveTechnical',{
    http: { verb: 'get'},
    returns: {arg: 'results',type :'executionerrors'}
  })
  executionerror.remoteMethod('getResolvedTechnical',{
    http: { verb: 'get'},
    returns: {arg: 'results',type :'executionerrors'}
  })
  executionerror.remoteMethod('getActiveFunctional',{
    http: { verb: 'get'},
    returns: {arg: 'results',type :'executionerrors'}
  })
  executionerror.remoteMethod('getResolvedFunctional',{
    http: { verb: 'get'},
    returns: {arg: 'results',type :'executionerrors'}
  })
};
