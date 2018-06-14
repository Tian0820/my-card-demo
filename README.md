# my-card-server

> A Node.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start
```

## Introduction

### Cover Page
![](https://github.com/Tian0820/my-card-server/raw/master/data/cover.png)  

### Greeting Page
![](https://github.com/Tian0820/my-card-server/raw/master/data/greeting.png)  

### End Page
![](https://github.com/Tian0820/my-card-server/raw/master/data/end.png)  

### Manage Page
![](https://github.com/Tian0820/my-card-server/raw/master/data/manage.png)  


# 生日贺卡客户端存储登录态的技术方案
## 几种web存储方案
比较常用的有三种机制：Cookie、localStorage 和 sessionStorage。

#### Cookie
Cookie是一小段文本信息，它存储于访问者的计算机中，每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。

当浏览器从服务器上请求 web 页面时， 属于该页面的 cookie 会被添加到该请求中。服务端通过这种方式来获取用户的信息。

#### localStorage
localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。

#### sessionStorage
sessionStorage 与 localStorage 类似，但保存数据的生命周期不同。它只是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但当页面关闭后，sessionStorage 中的数据就会被清空。

## 针对存储登录态的优缺点比较
|   特性   |   Cookie    | localStorage | sessionStorage |
|   ----   |  ---------  | ------------ | -------------- |
| 数据大小 | 4K | 5MB | 5MB |
| 生命周期 | 可设置过期时间 | 没有过期时间，直到手动去除 | 在当前会话总存在，页面关闭后被清空 |
|   性能   | 一旦被设置，就会被携带在每次请求头部，增加了请求时间 | 可选择是否提交 | 可选择是否提交 |
|  安全性  | 明文传递，可以被他人访问，容易被窃取 | 明文存储，对 XSS 攻击没有抵御机制 | 明文存储，对 XSS 攻击没有抵御机制 |

在生日贺卡客户端中，如果要保存登录态，并保证用户下一次打开贺卡不需要重新登录，可以通过一串加密的身份验证的 token 来实现，这个 token 不会很大，并且每次打开贺卡和进行操作时都需要验证。同时，一段时间后需要清空登录状态，提醒用户重新登录。所以使用 cookie 存储比较合适。

## 实现方案
#### 思路
前端用户登录时，调用后端的登录方法，后端通过 JWT 机制生成一个 token，返回给前端，前端把这个 token 存储到 cookie 中，并设置过期时间。每次向后端发送请求时会把 cookie 携带在请求头部，后端取得 token 后验证身份，验证成功就不需要再次登录。

#### 安全性
可以通过设置 cookie 的 HttpOnly 属性，这样不能通过浏览器来修改带有 HttpOnly 属性的 cookie，只能通过服务器来修改，避免了 XSS 攻击。

例如，在前端设置 cookie，把 username 设置为 test：
```
document.cookie = 'username=test'
```
此时，在 chrome 浏览器中可以通过 JS 取得 cookie，并可以修改。

![](https://github.com/Tian0820/my-card-server/raw/master/data/cookie1.jpg) 

如果把 cookie 设置成 HttpOnly， 就可以避免这样的问题：
```
document.cookie = 'username=test; HttpOnly'
```
这样，chrome 就无法取得 key 为 username 的 cookie，也无法修改了。
![](https://github.com/Tian0820/my-card-server/raw/master/data/cookie2.jpg) 

#### cookie 的 domain
不同业务的子域名都不一样，但是根域名相同，在不同的域名下登录态需要相通。所以需要设置 cookie 的 domain 属性为根域名：
```
document.cookie = 'username=test; HttpOnly; domain=.leanapp.cn'
```
这样，a.leanapp.cn 和 b.leanapp.cn 和 a.b.leanapp.cn 都有这个 cookie。

