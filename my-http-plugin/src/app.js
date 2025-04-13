// 状态码映射
const statusCodeMap = {
    '100': '继续请求，服务器已接收到请求，需要客户端继续发送请求',
    '101': '协议切换，服务器接受客户端的请求，正在切换协议',
    '102': '处理中的请求（WebDAV），服务器正在处理请求',
    '200': '请求成功，服务器已成功处理请求',
    '201': '创建成功，服务器成功创建资源',
    '202': '接受请求，服务器接受请求，但未处理完成',
    '203': '非权威信息，服务器返回的信息不完全可靠',
    '204': '无内容，服务器成功处理请求，但不返回任何内容',
    '205': '重置内容，服务器成功处理请求，要求客户端重置文档视图',
    '206': '部分内容，服务器成功处理了部分请求',
    '207': '多重状态（WebDAV），多个状态信息',
    '208': '已报告（WebDAV），状态码表示当前资源已被报告',
    '226': 'IM 使用，表示响应符合 "IM"（即时消息）协议',
    '300': '多种选择，资源的不同表示形式可供选择',
    '301': '永久重定向，请求的资源已被永久移动到新位置',
    '302': '临时重定向，资源暂时被移动到其他位置',
    '303': '查看其他，客户端应该通过其他 URL 继续请求',
    '304': '未修改，客户端的缓存版本是最新的',
    '305': '使用代理，要求客户端通过指定的代理访问资源',
    '306': '切换代理，代理服务器的使用已切换',
    '307': '临时重定向，资源被临时转移，客户端应继续使用原有 URL',
    '308': '永久重定向，资源永久移动到新 URL',
    '400': '错误请求，服务器无法理解请求的格式',
    '401': '未授权，必须提供有效的身份验证',
    '402': '需要付款，未来可能会使用',
    '403': '禁止访问，服务器拒绝请求',
    '404': '未找到，服务器无法找到请求的资源',
    '405': '方法不允许，请求方法对指定的资源不被允许',
    '406': '不可接受，服务器无法提供客户端请求的响应内容',
    '407': '代理认证要求，必须通过代理进行身份验证',
    '408': '请求超时，客户端未及时发送请求',
    '409': '请求冲突，服务器处理请求时发生冲突',
    '410': '已删除，资源已永久删除',
    '411': '需要内容长度，服务器要求明确指定请求内容的长度',
    '412': '前提条件失败，服务器无法满足请求中的前提条件',
    '413': '请求实体太大，客户端请求的实体过大',
    '414': '请求 URI 太长，URL 太长，服务器无法处理',
    '415': '不支持的媒体类型，服务器无法处理请求的媒体类型',
    '416': '请求范围不符合，无法满足请求的数据范围',
    '417': '期望失败，服务器无法满足请求的 Expect 头部',
    '418': '我是一个茶壶（RFC 2324），这是一个幽默的错误代码',
    '421': '请求错误，无法处理请求',
    '422': '不可处理实体（WebDAV），服务器理解请求内容，但无法处理',
    '423': '已锁定（WebDAV），资源被锁定，无法处理请求',
    '424': '失败的依赖关系（WebDAV），请求失败，由于依赖的其他操作失败',
    '425': '太早，服务器不愿意处理请求',
    '426': '需要升级，客户端需要升级协议',
    '427': '未分配状态码，预留状态码',
    '428': '需要前提条件，服务器要求请求满足某些条件',
    '429': '请求过多，客户端发送的请求超过了服务器的处理能力',
    '431': '请求头字段过大，请求头内容太大，无法处理',
    '451': '因法律原因不可用，访问资源受到法律限制',
    '500': '服务器内部错误，服务器遇到错误，无法完成请求',
    '501': '未实现，服务器不支持当前请求所需的功能',
    '502': '错误网关，服务器作为网关或代理时收到无效响应',
    '503': '服务不可用，服务器当前无法处理请求',
    '504': '网关超时，服务器作为网关或代理时未收到及时响应',
    '505': 'HTTP 版本不受支持，服务器不支持客户端请求的 HTTP 版本',
    '506': '变体也协商（RFC 2295），服务器无法根据请求的内容协商一个合适的响应',
    '507': '存储不足（WebDAV），服务器无法完成请求，因存储空间不足',
    '508': '检测到循环（WebDAV），请求导致了无限循环',
    '510': '未扩展，服务器需要扩展功能才能完成请求',
    '511': '网络认证要求，客户端必须进行身份验证才能访问网络'
};

// 获取DOM元素
const statusCodeInput = document.getElementById('statusCodeInput');
const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');
const statusCodeElement = document.getElementById('statusCode');
const statusBadgeElement = document.getElementById('statusBadge');
const statusDescriptionElement = document.getElementById('statusDescription');

// 处理搜索
function handleSearch() {
    const code = statusCodeInput.value.trim();

    if (code) {
        // 查询状态码信息
        const info = statusCodeMap[code] || '未知状态码';

        // 更新UI
        statusCodeElement.textContent = code;
        statusBadgeElement.textContent = getCategoryName(code);
        statusBadgeElement.className = 'status-badge ' + getCategoryClass(code);
        statusDescriptionElement.textContent = info;

        // 显示结果
        resultContainer.style.display = 'block';

        // 添加动画效果
        resultContainer.style.animation = 'none';
        setTimeout(() => {
            resultContainer.style.animation = 'fadeIn 0.3s ease-out';
        }, 10);

        // 清空输入框
        statusCodeInput.value = '';
    }
}

// 获取状态码类别样式
function getCategoryClass(code) {
    const firstDigit = code.charAt(0);
    switch (firstDigit) {
        case '1': return 'info-badge';
        case '2': return 'success-badge';
        case '3': return 'redirect-badge';
        case '4': return 'client-error-badge';
        case '5': return 'server-error-badge';
        default: return 'unknown-badge';
    }
}

// 获取状态码类别名称
function getCategoryName(code) {
    const firstDigit = code.charAt(0);
    switch (firstDigit) {
        case '1': return '信息';
        case '2': return '成功';
        case '3': return '重定向';
        case '4': return '客户端错误';
        case '5': return '服务器错误';
        default: return '未知';
    }
}

// 绑定事件
searchButton.addEventListener('click', handleSearch);

// 绑定回车键
statusCodeInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});