# Service for image resizing

## Running 

```console
node index.mjs 80
```

## Using

After the service was started, you can call

```console
http://localhost/img/resize?u=<image url>&w=<width>&h=<height>
```

Where width and height are positive integers, either width or height can be omitted.

## Testing

While service is running:

```console
node test.mjs
```
