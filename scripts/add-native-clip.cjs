// Add the first native example only after the video was produced successfully.
const fs=require('node:fs'),model=require('../content-model.js');
const file='content/entries.json',manifest=model.manifest(JSON.parse(fs.readFileSync(file,'utf8')));
if(fs.statSync('media/okay-apollo.mp4').size<1000)throw Error('Video file is missing or incomplete.');
const item=model.entry({
 word:'okay',category:'everyday',meaning:'All right; used to agree or move to the next action.',
 kazakh:'Жарайды; келісуді не келесі әрекетке көшуді білдіреді.',example:"Okay, let's get started.",
 note:'In this clip, “okay” introduces what the speaker will do next.',
 video:{src:'media/okay-apollo.mp4',title:'Okay — a real spoken example',caption:"Okay, I'm going to step off the LEM now.",credit:'NASA · Apollo 11, 1969 · archival mission recording',license:'Public domain · NASA / US federal government',captions:'media/okay-apollo.vtt'}
});
if(!manifest.entries.some(e=>model.normalize(e.word)==='okay')){
 manifest.entries.push(item);manifest.revision='apollo-native-20260914';
 fs.writeFileSync(file,JSON.stringify(model.manifest(manifest),null,2)+'\n');
}
fs.writeFileSync('media/okay-apollo.vtt',"WEBVTT\n\n00:00:00.946 --> 00:00:04.946\nOkay, I'm going to step off the LEM now.\n");
