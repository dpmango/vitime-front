require 'compass/import-once/activate'
# Require any additional compass plugins here.
require 'breakpoint'
require 'toolkit'
require 'sass-media_query_combiner'
require 'singularitygs'
require 'animate'


# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false
# compass watch --sourcemap