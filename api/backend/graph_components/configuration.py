import os
from dataclasses import dataclass, fields
from typing import Any, Optional

from langchain_core.runnables import RunnableConfig

DEFAULT_BLOG_STRUCTURE = """

The blog post should follow this strict three-part structure:

1. Introduction (max 1 section)
   - Start with ### Key Links and include user-provided links  
   - Brief overview of the problem statement
   - Brief overview of the solution/main topic
   - Maximum 100 words

2. Main Body (exactly 2-3 sections)
    - Each section must:
      * Cover a distinct aspect of the main topic
      * Include at least one relevant code snippet
      * Be 150-200 words
    - No overlap between sections

3. Conclusion (max 1 section)
   - Brief summary of key points
   - Key Links
   - Clear call to action
   - Maximum 150 words
   
"""


@dataclass
class Configuration:
    blog_structure: str = DEFAULT_BLOG_STRUCTURE

    @classmethod
    def from_runnable_config(
        cls, config: Optional[RunnableConfig] = None
    ) -> "Configuration":
        """
        Create a Configuration instance from a RunnableConfig.

        This method reads configuration values from the provided RunnableConfig,
        environment variables, and default values. If a value is not provided in the
        RunnableConfig, it checks the environment variables. If neither is available,
        it uses the default value for the field.

        Parameters:
        - config (Optional[RunnableConfig]): The RunnableConfig instance to read configuration values from.
          If not provided, it defaults to None.

        Returns:
        - Configuration: A Configuration instance with the merged configuration values.
        """
        if config is not None:
            if "configurable" in config:
                configurable = config["configurable"]
            else:
                configurable = {}
        else:
            configurable = {}

        values: dict[str, Any] = {}

        for field in fields(cls):
            if field.init:
                env_value = os.environ.get(field.name.upper())
                configurable_value = configurable.get(field.name)

                if env_value is not None:
                    values[field.name] = env_value
                elif configurable_value is not None:
                    values[field.name] = configurable_value
                else:
                    values[field.name] = field.default

        return cls(**values)
