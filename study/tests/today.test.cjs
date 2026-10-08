'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {dailyTasks}=require('../today.js');

function plan() {
  return {
    study_start:'2026-10-07',study_end:'2027-02-03',
    weekly_base_minutes:420,weekly_max_minutes:480,
    courses:[
      {name:'Web',code:'INF13207L'},
      {name:'Statistics',code:'MAT02354L'},
      {name:'Software',code:'INF13204L'},
      {name:'HCI',code:'INF13186L'},
      {name:'Data',code:'INF14387L'}
    ],
    requirements:[
      {id:'portuguese-placement',course:'Portuguese',title:'Optional placement',date:'2026-10-09',condition:'If participating in Portuguese',source_url:'https://www.moodle.uevora.pt/2627/course/view.php?id=559'},
      {id:'web-test',course:'Web',title:'First test',date:'2026-10-10',source_url:'https://www.moodle.uevora.pt/2627/course/view.php?id=737'},
      {id:'stats-f1-choice',course:'Statistics',title:'F1 attendance choice',date:'2026-10-16',condition:'If attending first test',source_url:'https://www.moodle.uevora.pt/2627/mod/choice/view.php?id=24474'}
    ]
  };
}

test('Optional Portuguese never displaces a selected-course deadline',()=>{
  const tasks=dailyTasks('2026-10-08',plan());
  assert.equal(tasks.find(t=>t.id==='practice').course,'Web');
  assert.match(tasks.find(t=>t.id==='practice').title,/First test/);
});

test('Upcoming Statistics assessment choice stays actionable',()=>{
  const tasks=dailyTasks('2026-10-14',plan());
  assert.equal(tasks.find(t=>t.id==='practice').course,'Statistics');
  assert.match(tasks.find(t=>t.id==='practice').title,/F1 attendance choice/);
});

test('Public study plan does not infer completion',()=>{
  const tasks=dailyTasks('2026-10-08',plan());
  assert.equal(tasks.some(t=>t.done===true),false);
});
