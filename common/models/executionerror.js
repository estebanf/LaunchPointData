'use strict';
var request = require('request');
var config = require('../../server/config.local');
// require('request-debug')(request);
var baseObject = {
  'proc:Receive_recover_signalRequest': {
    '@xmlns': {
      proc: 'http://bpms.everteam.com/Processes/',
      laun: 'http://www.example.org/Launchpoint'
    },
    'laun:recoverId': {
      $: ''
    }
  }
}
var baseEndpoint = config.bpms + '/ode/processes/LaunchPointProcess_Processes_'
var types = {
  BUSINESSRULE: {endpoint:'BusinessRules_ExecutionRules_process_ExceptionManagement',ns:'BusinessRules/ExecutionRules/process'},
  CASECLOSEREOPEN: {endpoint:'Integrations_CaseCloseReopen_process_Exception_Management',ns:'Integrations/CaseCloseReopen/process'},
  CASEMONITOR: {endpoint:'Integrations_caseMonitor_process-monitor_ExceptionManagement',ns:'Integrations/caseMonitor/process-monitor'},
  CHECKCASEEXISTANCE: {endpoint:'Integrations_CheckCaseExistance_process_ExceptionManagement',ns:'Integrations/CheckCaseExistance/process'},
  CREATEACTIVITY: {endpoint:'Integrations_createActivity_process_Exception_Management',ns:'Integrations/createActivity/process'},
  GENERATEFILE: {endpoint:'Integrations_generateFile_process_Exception_management',ns:'Integrations/generateFile/process'},
  GETACTIVITIES: {endpoint:'Integrations_getCaseActivities_process_Exception_Management',ns:'Integrations/getCaseActivities/process'},
  GETCASEDETAILS: {endpoint:'Integrations_getCaseDetails_process_ExceptionManagement',ns:'Integrations/getCaseDetails/process'},
  GETDIARIES: {endpoint:'Integrations_getCaseDiaries_process_ExceptionManagement',ns:'Integrations/getCaseDiaries/process'},
  GETCASEQUEUED: {endpoint:'Integrations_getCaseQueued_process_ExceptionManagement',ns:'Integrations/getCaseQueued/process'},
  GETDCMCASEDETAILS: {endpoint:'Integrations_getDCMCase_process_ExceptionManagement',ns:'Integrations/getDCMCase/process'},
  GETIQBATCH: {endpoint:'Integrations_getIQBatch_process_ExceptionManagement',ns:'Integrations/getIQBatch/process'},
  QUERYISORESPONSE: {endpoint:'Integrations_getIsoResponse_process_ExceptionManagement',ns:'Integrations/getIsoResponse/process'},
  GETOLDESTIQCASES: {endpoint:'Integrations_getOldestQueuedCases_process_ExceptionManagement',ns:'Integrations/getOldestQueuedCases/process'},
  SENDTOISO: {endpoint:'Integrations_sendToISO_process_Exception_Management',ns:'Integrations/sendToISO/process'},
  UPDATELIFECYCLE: {endpoint:'Integrations_updateCaseLifeCycle_process_Exception_management',ns:'Integrations/updateCaseLifeCycle/process'},

}
function sendRecover(key,id,cb){
  var params = types[key];
  var body = Object.assign({}, baseObject);
  body['proc:Receive_recover_signalRequest']['@xmlns'].proc = body['proc:Receive_recover_signalRequest']['@xmlns'].proc + params.ns
  body['proc:Receive_recover_signalRequest']['laun:recoverId'].$ = id + ''
  request({
    method:'POST',
    url: baseEndpoint + params.endpoint,
    headers: {
      'Content-Type':'application/json/badgerfish'
    },
    body: JSON.stringify(body)
  },function(error,response,body){
    cb(null,JSON.parse(body));
  })
}
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
  executionerror.recover = function(id,cb){
    executionerror.findById(id,function(err,obj){
      if(!obj.resolved){
        sendRecover(obj.step,id,cb);
      }
    })
    // executionerror.find({where:{and: [{technicalerror:false},{resolved:true}]}},function(err,results){
    //   cb(null,results)
    // })
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
  executionerror.remoteMethod('recover',{
    accepts:{arg:'id',type:'number'},
    http: { path:'/recover/:id', verb: 'get'},
    returns: {arg: 'results',type :'Object'}
  })
};
