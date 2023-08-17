layui.define([], function (exports) {
    var $ = layui.jquery

    // 先加载css
    layui.link(layui.cache.base + 'cherry-markdown/cherry-markdown.css');
    // 再加载css
    layui.link(layui.cache.base + 'cherry-markdown/cherry-ext.css')

    var cherry = {}

    cherry.init = function (element_id, isReadOnly = false) {
        let config = cherry.config(element_id);
        config['id'] = element_id
        if (isReadOnly) {
            config['toolbars']['toolbar'] = false;
            config['editor']['defaultModel'] = 'previewOnly'
        }
        $.getScript(layui.cache.base + 'cherry-markdown/cherry-markdown.js', function (resp, status) {
            cherry.obj = new Cherry(config)
        })
    }

    cherry.html = function () {
        return cherry.obj.getHtml()
    }
    cherry.md = function () {
        return cherry.obj.getMarkdown()
    }
    cherry.image = function () {
        return cherry.obj.export('img');
    }
    cherry.pdf = function () {
        return cherry.obj.export();
    }

    cherry.setContent = function (content) {
        cherry.obj.setMarkdown(content)
    }

    cherry.fileUpload = function (file, callback) {
        callback('https://www.baidu.com')
    }

    file_type = {
        'img': ['jpeg', 'jpg', 'tiff', 'png', 'gif', 'svg', 'bmp'],
        'doc': ['doc', 'docx'],
        'ppt': ['ppt'],
        'txt': ['txt', 'log'],
        'xls': ['xls', 'xlsx'],
        'zip': ['7z', 'rar', 'zip'],
        'mp3': ['mp3', 'wav'],
        'mp4': ['mp4', 'avi', 'mov', 'flv'],
    }

    cherry.config = function () {
        return {
            fileUpload: cherry.fileUpload,
            toolbars: {
                theme: 'light',
                toolbar: [
                    'bold', 'italic', 'underline', 'strikethrough', '|', 'sub', 'sup', '|', 'size', 'color',
                    {header: ['h4', 'h5']}, '|', 'panel', 'justify', 'detail', '|', 'list', {
                        insert: ['image', 'audio', 'video', 'pdf',
                            'word', 'link', 'hr', 'br', 'code', 'formula', 'toc', 'table']
                    }, 'export', 'graph', 'theme', 'settings'
                ],
                sidebar: ['mobilePreview', 'copy'],
            },
            editor: {}
        }
    }

    exports('cherry', cherry);
});
