# miniRequire
A mini async javascript loader with free dependency and easy usage.
# Old Way
Generally,you may load javascript file in html file seriesly.
```
<script src="jquery.js"></script>
<script src="partAOfIndex.js"></script>
<script src="partBOfIndex.js"></script>
<script src="partCOfOther.js"></script>
<script src="index.js"></script>
```
It's hard to recognize the dependency of javascript files in this way,and your website need to load all javascript files even if some of them is not current used.
# New simple way
just load `miniRequire.js` first and then call `miniRequire` to load javascript file.
```
<script src="miniRequire.js"></script>
<script>
  miniRequire('index',function(){
    console.log('index.js loaded')
  })
</script>
```

index.js
```
  miniRequire('jQuery',function(){
    console.log('jQuery.js loaded')
    miniRequire(['partAOfIndex','partBOfIndex'],function(){
      console.log('partAOfIndex.js,partAOfIndex.js loaded')
    }
  })
```
The scripts would be loaded as below and the `partCOfOther.js` that no files are depended on is skipped.
```
<script src="jquery.js"></script>
<script src="partAOfIndex.js"></script>
<script src="partBOfIndex.js"></script>
<script src="index.js"></script>
```

# miniRequireSetup
Call `miniRequireSetup` to do initial setup
```
miniRequireSetup({
  baseUrl:'', // base url of javascript file
  prefix:'',// javascript file prefix
  endfix:''// javascript file endfix
})
```


