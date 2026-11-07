import sharp from 'sharp';
const f = process.argv[2];
const m = await sharp(f).metadata();
console.log(m.width, m.height, m.format, 'alpha:', m.hasAlpha, 'ratio', (m.width/m.height).toFixed(3));
const {data, info} = await sharp(f).raw().toBuffer({resolveWithObject:true});
const px = (x,y)=>{const i=(y*info.width+x)*info.channels;return [...data.slice(i,i+info.channels)]};
console.log('corners', px(0,0), px(info.width-1,0), px(0,info.height-1), px(info.width-1,info.height-1));
