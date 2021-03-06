# remote

[Add](#add), [list](#list), [modify](#modify), and [remove](#remove) available
data remotes.

```usage
    usage: dvc remote [-h] [-q] [-v] {add,remove,modify,list} ...

    positional arguments:
        add                   Add remote
        remove                Remove remote
        modify                Modify remote
        list                  List remotes

    optional arguments:
        -h, --help            show this help message and exit
        -q, --quiet           Be quiet.
        -v, --verbose         Be verbose.
```

The same way as Github serves as a master storage for Git-based projects, DVC
data remotes provide a central place to keep and share data and model files.
With a remote data storage, you can pull models and data files which were
created by your team members without spending time and resources to re-build
models and re-process data files. It also saves space on your local environment -
DVC can [fetch](/doc/commands-reference/fetch) into the local cache only the
data you need for a specific branch/commit.

Using DVC with a remote data storage is optional. By default, DVC is
configured to use a local data storage only (usually `.dvc/cache` directory
inside your repository), which enables basic DVC usage scenarios out of the box.

[Add](#add), [list](#list), [modify](#modify), and [remove](#remove) commands
read or modify DVC [config files](/doc/user-guide/dvc-files-and-directories).
Alternatively, `dvc config` can be used or these files could be edited manually.


## add

Add a new data remote. Depending on your storage type you might need to run `dvc
remote modify` to provide credentials and/or configure other remote parameters.

```usage
    usage: dvc remote add [-h] [-q] [-v] [--local] [-d] name url

    positional arguments:
        name           Name.
        url            URL.

    optional arguments:
        -h, --help     show this help message and exit
        -q, --quiet    Be quiet.
        -v, --verbose  Be verbose.
        --local        Use local config.
        -d, --default  Set as default remote.
```

`name` and `url` are required. `url` specifies a location to store your data. It
could be S3 path, SSH path, Azure, Google cloud, local directory, etc - see more
examples below. Whenever possible DVC will create a remote directory if does not
exists yet. It won't create an S3 bucket though and will rely on default access
settings.

This command creates a section in the DVC [config file](/doc/user-guide/dvc-files-and-directories)
and optionally assigns a default remote in the core section:

```ini
   ['remote "myremote"']
   url = /tmp/dvc-storage
   [core]
   remote = myremote
```

**Options:**

* **`local`** - save the remote configuration to the
[local](/doc/user-guide/dvc-files-and-directories) config (`.dvc/config.local`).
This is useful when you need to specify private options or local environment
specific settings in your config, that you don't want to track and share through
 Git (credentials, private locations, etc).

* **`default`** - commands like `dvc pull`, `dvc push`, `dvc fetch` will be
using this remote by default to save or retrieve data files unless `-r` option
is specified for them. Use `dvc config` to unset/change the default remote:
`dvc config -u core.remote`.


<details>

### Click for AWS S3 example

```dvc
    $ dvc remote add myremote s3://bucket/path
```

By default DVC expects your AWS CLI is already
[configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
DVC will be using default AWS credentials file to access S3. To override some of
these settings, you could the options described in `dvc remote modify`.

</details>

<details>

### Click for Azure example

```dvc
    $ export AZURE_STORAGE_CONNECTION_STRING="<my-connection-string>"
    $ dvc remote add myremote "azure://ContainerName=my-bucket;"
```

The Azure Blob Storage remote can also be configured entirely via environment
variables:

```dvc
    $ export AZURE_STORAGE_CONNECTION_STRING="<my-connection-string>"
    $ export AZURE_STORAGE_CONTAINER_NAME="my-bucket"
    $ dvc remote add myremote "azure://"
```

Alternatively, all the configuration can also be passed via the remote URL:

```dvc
    $ dvc remote add myremote "azure://ContainerName=my-bucket;<my-connection-string>"
```

* **`connection string`** - this is the connection string to access your Azure
Storage Account. If you don't already have a storage account, you can create
one following [these instructions](https://docs.microsoft.com/en-us/azure/storage/common/storage-create-storage-account).
The connection string can be found in the "Access Keys" pane of your Storage
Account resource in the Azure portal.

* **`container name`** this is the top-level container in your Azure Storage
Account under which all the files for this remote will be uploaded. If the
container doesn't already exist, it will be created automatically.

</details>


<details>

### Click for Google Cloud Storage example

```dvc
    $ dvc remote add myremote gs://bucket/path
```

</details>

<details>

### Click for SSH example

```dvc
    $ dvc remote add myremote ssh://user@example.com:/path/to/dir
```

</details>

<details>

### Click for HDFS example

```dvc
    $ dvc remote add myremote hdfs://user@example.com/path/to/dir
```

</details>


## modify

Modify remote settings.

```usage
    usage: dvc remote modify [-h] [-q] [-v] [-u] [--local] name option [value]

    positional arguments:
      name           Name.
      option         Option.
      value          Value.

    optional arguments:
      -h, --help     show this help message and exit
      -q, --quiet    Be quiet.
      -v, --verbose  Be verbose.
      -u, --unset    Unset option.
      --local        Use local config.
```

**Optional arguments:**

* **`unset`** - delete configuration value

* **`local`** - modify the [local](/doc/user-guide/dvc-files-and-directories)
configuration file (`.dvc/config.local`). This is useful when you are modifying
private options or local environment specific settings in your config, that you
don't want to track and share through Git (credentials, private locations, etc).

Remote `name` and `option` name are required. Option names are remote type
specific. See below examples and a list of per remote type - AWS S3, Google
cloud, Azure, SSH, and others.

This command modifies a section in the DVC [config file](/doc/user-guide/dvc-files-and-directories).
Alternatively, `dvc config` or manual editing could be used to change settings.

<details>

### Click for AWS S3 available options

By default DVC expects your AWS CLI is already
[configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
DVC will be using default AWS credentials file to access S3. To override some of
these settings, you could use the following options:

* **`region`** - change AWS S3 remote region::

  ```dvc
    $ dvc remote modify myremote region us-east-2
  ```

* **`profile`** - credentials profile name to use to access AWS S3:

  ```dvc
    $ dvc remote modify myremote profile myprofile
  ```

* **`credentialpath`** - credentials path to use to access AWS S3:

  ```dvc
    $ dvc remote modify myremote credentialpath /path/to/my/creds
  ```

* **`endpointurl`** - endpoint URL to use to access AWS S3:

  ```dvc
    $ dvc remote modify myremote endpointurl myendpoint.com
  ```

* **`url`** - remote location URL

  ```dvc
    $ dvc remote modify myremote url s3://bucket/remote
  ```

</details>

<details>

### Click for Azure available options

* **`url`** - remote location URL

  ```dvc
    $ dvc remote modify myremote url "azure://ContainerName=remote;"
  ```

</details>


<details>

### Click for Google Cloud Storage available options

* **`projectname`** - project name to use.

  ```dvc
    $ dvc remote modify myremote projectname myproject
  ```

* **`url`** - remote location URL.

  ```dvc
    $ dvc remote modify myremote url gs://bucket/remote
  ```

</details>

<details>

### Click for SSH available options

* **`url`** - remote location URL.

  ```dvc
    $ dvc remote modify myremote url ssh://user@example.com:/path/to/remote
  ```

* **`user`** - username to use to access a remote.

  ```dvc
    $ dvc remote modify myremote user myuser
  ```

* **`port`** - port to use to access a remote (default: 22).

  ```dvc
    $ dvc remote modify myremote port 2222
  ```

* **`keyfile`** - path to private key to use to access a remote.

  ```dvc
    $ dvc remote modify myremote keyfile /path/to/keyfile
  ```

</details>

<details>

### Click for HDFS available options

* **`user`** - username to use to access a remote.

  ```dvc
    $ dvc remote modify myremote user myuser
  ```

</details>


## list

Show all available remotes.

```usage
    usage: dvc remote list [-h] [-q] [-v] [--local]

    List remotes.

    optional arguments:
      -h, --help     show this help message and exit
      -q, --quiet    Be quiet.
      -v, --verbose  Be verbose.
      --local        Use local config.
```

**Options:**

* **`local`** - list remotes specified in the
[local](/doc/user-guide/dvc-files-and-directories) configuration file
(`.dvc/config.local`). Local configuration files stores private settings that
should not be tracked by Git.


## remove

Remove a specified remote. This command affects DVC configuration files only, it
does not physically remove your data files stored remotely.

```usage
    usage: dvc remote remove [-h] [-q] [-v] [--local] name

    positional arguments:
      name           Name

    optional arguments:
      -h, --help     show this help message and exit
      -q, --quiet    Be quiet.
      -v, --verbose  Be verbose.
      --local        Use local config.
```

Remote `name` is required.

This command removes a section in the DVC [config file](/doc/user-guide/dvc-files-and-directories).
Alternatively, it is possible to edit config files manually.

**Options:**

* **`local`** - remove remote specified in the
[local](/doc/user-guide/dvc-files-and-directories) configuration file
(`.dvc/config.local`). Local configuration files stores private settings or
local environment specific settings that should not be tracked by Git.


## Examples

1. Let's for simplicity add a default local remote:

```dvc
    $ dvc remote add -d myremote /path/to/remote
    $ dvc remote list

      myremote
```

DVC config file would look like:

```ini
   ['remote "myremote"']
   url = /path/to/remote
   [core]
   remote = myremote
```

2. Add AWS S3 remote and modify it's region:

```dvc
    $ dvc remote add myremote s3://mybucket/myproject
    $ dvc remote modify myremote region us-east-2
```

3. Remove remote:

```dvc
    $ dvc remote remove myremote
```
