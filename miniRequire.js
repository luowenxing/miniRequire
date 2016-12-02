// 实现简单的require,按需加载js资源
(function(exports) {

    var defaultOption = {
        baseUrl:'./',
        prefix:'',
        endfix:''
    }

    var extend = function(dest,src) {
        if(dest != undefined && typeof dest == 'object') {
            for(var property in src) {
                if(dest.hasOwnProperty(property)) {
                    extend(dest[property],src[property])
                }
                dest[property] = src[property]
            }
        }
        return dest
    }

    var requireSetup = function(option) {
        extend(defaultOption,option)
    }

    var require = (function() {
        var required = []
        var loadCallbacks = []
        var contains = function(name) {
            for(var index=0;index<required.length;index++) {
                if(required[index] === name) {
                    return true
                }
            }
            return false
        }
        var loadScript = function(name,complete) {
            var fileName = defaultOption.baseUrl + defaultOption.prefix + name + defaultOption.endfix + '.js'
            var header = document.getElementsByTagName('head')[0]
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.onload = script.onreadystatechange = function() {
                if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                    required.push(name)
                    script.onload = script.onreadystatechange = null
                    complete()
                }
            }
            script.src =  fileName + '?' + Math.random()
            header.appendChild(script)
        }
        
        return function(name,loaded) {
            loadCallbacks.push(loaded)
            var nameArray = []
            if(typeof name === 'string') {
                nameArray = [name]
            }else if(name instanceof Array) {
                nameArray = name
            }
            (function loadScripts(index,complete) {
                if(index < nameArray.length) {
                    var name = nameArray[index]
                    if(document && !contains(name)) {
                        loadScript(name,function(){
                            loadScripts(index+1,complete)
                        })
                    } else {
                        loadScripts(index+1,complete)
                    }
                } else {
                    complete()
                }
            })(0,function(){
                loadCallbacks.pop()()
            })
        }
    })()
    exports.miniRequire = require
    exports.miniRequireSetup = requireSetup
})(window)

