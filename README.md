


```
<script 
    src="https://code.jquery.com/jquery-3.6.0.min.js" 
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
    crossorigin="anonymous">
</script>
<script type="text/javascript">
    $.ajax({
        type: "GET",
        url: "https://xxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/v1",
        beforeSend : function (request) {
            request.setRequestHeader("X-Api-Key", "aaaaaaaaaa")
        },
        success: function( result ) {
            console.log(result)
        }
    });
</script>
```

```
curl -i -X GET -H "x-api-key: aaaaaaaaaa" https://xxxxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/v1
```